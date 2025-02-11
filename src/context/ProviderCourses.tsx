'use client'

import { supabase } from "@/service/supabase";
import { useRouter } from "next/router";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Curso, TrilhaCurso } from "@/components/courses/types";
import { getAllCourses, getCoursesByTrail } from "@/service/requisitions";

interface CourseContextProps {
    isAdmin: boolean;
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    isModalEdit: boolean;
    setIsModalEdit: (value: boolean) => void;
    idToEdit: number;
    setIdToEdit: (value: number) => void;
    idTrail: string | string[] | undefined;
    isModalRemove: boolean;
    setIsModalRemove: (value: boolean) => void;
    courses: TrilhaCurso[];
    allCourses: Curso[];
    updateCourses: () => void;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const { idTrail } = router.query;
    const [isAdmin, setIsAdmin] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [idToEdit, setIdToEdit] = useState(0);
    const [isModalRemove, setIsModalRemove] = useState(false);

    const [courses, setCourses] = useState<TrilhaCurso[]>([])
    const [allCourses, setAllCourses] = useState<Curso[]>([])

    useEffect(() => {
        authenticate()
        updateCourses()
    }, [idTrail])


    async function updateCourses() {

        if (idTrail == "0") {
            const courses = await getAllCourses()
            if (courses) {
                setAllCourses(courses)
            } 
        } else {
            const courses = await getCoursesByTrail(idTrail as string)
            if(courses) {
                setCourses(courses)
            }
        }
    }

    async function authenticate() {
        const userObject = localStorage.getItem("sb-bfogzwmikqkepnhxrjyt-auth-token");
        if (userObject) {
            const parsedUserObject = JSON.parse(userObject)

            const userId = parsedUserObject.user.id

            const { data, error } = await supabase
                .from('usuario')
                .select('*')
                .eq('id', userId)

            if (error) {
                return
            }

            if (data[0].isAdmin) {
                setIsAdmin(true);

                console.log('admin')
            } else {
                setIsAdmin(false);
            }
        }
    }


    return (
        <CourseContext.Provider value={{ isAdmin, showModal, setShowModal, isModalEdit, setIsModalEdit, idToEdit, setIdToEdit, idTrail, isModalRemove, setIsModalRemove, courses, allCourses, updateCourses }}>
            {children}
        </CourseContext.Provider>
    );
};

export const useCourseContext = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error("useAppContext deve ser usado dentro de um AppProvider");
    }
    return context as CourseContextProps;
};