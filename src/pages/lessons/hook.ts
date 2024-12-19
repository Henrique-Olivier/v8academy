import { getLessons } from "@/service/requisitions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ILessons } from "./types";

export default function useLessons() {
    const [listLessons, setListLessons] = useState<ILessons[]>([]);

    const router = useRouter();
    const { idCourse } = router.query;

    useEffect(() => {
        (async function () {
            if(idCourse) {
                const res = await getLessons(idCourse);
                const resMapping: ILessons[] = res.map(item => {
                    const idAula: number = item.idAula;
                    const titulo: string = item.titulo;
                    const modulo = item.modulo;

                    return {
                        idAula,
                        titulo,
                        modulo
                    }
                })
                setListLessons(resMapping);
            }
        })();
    }, [idCourse]);

    return { listLessons };
}