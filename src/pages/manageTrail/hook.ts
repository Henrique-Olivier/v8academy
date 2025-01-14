import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Course from "./types";
import { getCourses } from "@/service/requisitions";
import { supabase } from "@/service/supabase";

export default function useManageTrail() {
    const router = useRouter();
    const { addOrEdit } = router.query;

    const [titlePage, setTitlePage] = useState("Adicionar trilha");
    const [inputTitleTrail, setInputTitleTrail] = useState("");
    const [inputDescriptionTrail, setInputDescriptionTrail] = useState("");
    const [listCourses, setListCourses] = useState<Course[]>([]);
    
    const [show, setShow] = useState(false);
    const [titleModal, setTitleModal] = useState("Adicionar curso");
    const [listSelectCourses, setListSelectCourses] = useState<Course[]>([]);
    const [selectCourse, setSelectCourse] = useState<Course>({ id: "0", nome: "" });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    function showNotification(message: string, duration: number, type: "error" | "success") {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, duration);
    }
    
    useEffect(() => {

        if(!addOrEdit){
            router.push("/trails");
            return
        }

        const pathUrl = addOrEdit[0];
        const idPathUrl = addOrEdit[1];

        if(pathUrl === "edit") {
            setTitlePage("Editar trilha");

            async function getInfosTrail(id: string) {
                const { data } = await supabase
                    .from("trilha")
                    .select()
                    .eq("id", id);
                
                if(data) {
                    setInputTitleTrail(data[0].titulo);
                    setInputDescriptionTrail(data[0].descricao);
                }
            }

            async function getCoursesByTrail(id: string) {
                const { data } = await supabase
                    .from("cursosTrilha")
                    .select()
                    .eq("fkTrilha", id);
                
                if(data) {
                    data.forEach(item => {
                        getCourseById(item.fkCurso);
                    })
                }
            }

            async function getCourseById(id: string) {
                const { data } = await supabase
                    .from("curso")
                    .select()
                    .eq("id", id);
                
                if(data) {
                    data.forEach(item => {
                        setListCourses([...listCourses, { id: item.id, nome: item.titulo }]);
                    })
                }
            }

            getInfosTrail(idPathUrl);
            getCoursesByTrail(idPathUrl);
        }

        async function setCourses() {
            const data = await getCourses();
            const courses: Course[] = data.map(item => {
                return {
                    id: item.id,
                    nome: item.titulo
                }
            })

            setListSelectCourses(courses);
        }

        setCourses();
    }, [addOrEdit]);

    async function addNewTrail() {
        const { data } = await supabase
            .from("trilha")
            .insert({
                titulo: inputTitleTrail,
                descricao: inputDescriptionTrail
            })
            .select();

        if(data) {
            listCourses.map(async item => {
                await supabase.from("cursosTrilha").insert({
                    fkTrilha: data[0].id,
                    fkCurso: item.id
                });
            });

            showNotification("Trilha adicionada com sucesso!", 3000, "success");
            setTimeout(() => {
                router.push("/trails");
            }, 2000)
        }
    }

    async function saveTrail() {

        if(!addOrEdit){
            return;
        }

        const pathUrl = addOrEdit[0];
        const idPathUrl = addOrEdit[1];

        if(pathUrl === "add") {
            addNewTrail();
        } else if(pathUrl === "edit") {
            /* editTrail(); */
        }
    }

    return {
        titlePage,
        inputTitleTrail: {
            value: inputTitleTrail,
            onChange: setInputTitleTrail
        },
        inputDescriptionTrail: {
            value: inputDescriptionTrail,
            onChange: setInputDescriptionTrail
        },
        courses: {
            listCourses,
            add: setListCourses
        },
        modal: {
            titleModal,
            show,
            handleClose,
            handleShow,
            select: {
                listCourses: listSelectCourses,
                value: selectCourse,
                onchange: setSelectCourse
            }
        },
        saveTrail,
        toast: {
            show: {
                value: showToast,
                set: setShowToast
            },
            message: toastMessage,
            type: toastType
        }
    };
}