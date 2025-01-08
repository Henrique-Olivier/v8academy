import { useEffect, useState } from "react"
import { ITrails } from "./types";
import { getTrails } from "@/service/requisitions";
import { supabase } from "@/service/supabase";
import router from "next/router";

export default function useTrails() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [header, setHeader] = useState('');
    const [idForDeleteTrail, setIdForDeleteTrail] = useState(0);
    const [listTrails, setListTrails] = useState<ITrails[]>([]);

    async function authenticate() {
        const userObject = localStorage.getItem("sb-bfogzwmikqkepnhxrjyt-auth-token");
        if (userObject) {
            const parsedUserObject = JSON.parse(userObject)
            const userId = parsedUserObject.user.id
            const { data, error } = await supabase
            .from('usuario')
            .select('*')
            .eq('id', userId)
            if(error) {
                return
            }
            if(data[0].isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false)
            }
        } else {
            router.push('/login')
        }
    }

    async function deleteCourseTrails() {
        const { error } = await supabase
            .from('cursosTrilha')
            .delete()
            .eq('fkTrilha', idForDeleteTrail);
            
        if(error) {
            return false;
        } else {
            return true;
        }
    }

    async function deleteTrail() {

        const deletedCoursesTrails = await deleteCourseTrails();

        if(deletedCoursesTrails) {
            const { error } = await supabase
                .from('trilha')
                .delete()
                .eq('id', idForDeleteTrail);
    
            if(error) {
                return console.log(error);
            }
    
            return console.log('Trilha deletada com sucesso');
        }
    }

    function editModal(id: number, title: string) {
        setHeader(`Deletar trilha ${title}`);
        setIdForDeleteTrail(id);
    }

    useEffect(() => {
        authenticate();

        (async function () {
            const res = await getTrails();
            setListTrails(res);
        })()
    }, []);

    return {
        isAdmin,
        listTrails,
        deleteTrail,
        modal: {
            header,
            show: showModal,
            handleClose: () => setShowModal(false),
            handleShow: () => setShowModal(true),
            edit: editModal,
        }
    }
}