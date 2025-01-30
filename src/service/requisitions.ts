import { supabase } from "./supabase";
import { ITrails } from "../components/trails/types";

export async function getTrails() {
    const { data } = await supabase.from("trilha").select();

    if(data) {
        const trails: ITrails[] = data.map(item => {
            return {
                id: item.id,
                titulo: item.titulo,
                descricao: item.descricao
            }
        });

        return trails;
    }

    return [];
}

export async function getLessons(idCourse: string | string[]) {
    const { data } = await supabase.from("aula")
        .select("idAula, titulo, modulo!inner(id, titulo)")
        .eq('modulo.fkCurso', idCourse)

    if(data) {
        const lessons = data.map((item: { idAula: number, titulo: string, modulo: { id: number, titulo: string } | { id: number, titulo: string }[] }) => ({
            idAula: item.idAula,
            titulo: item.titulo,
            modulo: {
                idModulo: (Array.isArray(item.modulo) ? item.modulo[0].id : item.modulo.id),
                titulo: (Array.isArray(item.modulo) ? item.modulo[0].titulo : item.modulo.titulo)
            }
        }));
        return lessons;
    }

    return [];
}

export async function getCourses() {
    const { data } = await supabase.from("curso").select();

    if(data) {
        return data;
    }

    return [];
}