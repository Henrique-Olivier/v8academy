import { supabase } from "./supabase";
import { ITrails } from "../pages/trails/types";

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
    const { data, error } = await supabase.from("aula")
        .select("idAula, titulo, modulo!inner(titulo)")
        .eq('modulo.fkCurso', idCourse)

    if(data) {
        const lessons = data.map(item => ({
            idAula: item.idAula,
            titulo: item.titulo,
            modulo: (Array.isArray(item.modulo) ? item.modulo[0] : item.modulo) as { titulo: string }
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