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
    const { data } = await supabase.from("aula")
        .select("idAula, titulo, modulo!inner(titulo)")
        .eq('modulo.fkCurso', idCourse)

    if(data) {
        console.log(data)
        return data
    }

    return [];
}