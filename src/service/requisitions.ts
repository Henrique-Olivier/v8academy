import { supabase } from "./supabase";
import { ITrails } from "../components/trails/types";
import { TrilhaCurso } from "@/components/courses/types";

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

export async  function getAllCourses() {

    try {
      const { data, error } = await supabase
        .from("curso")
        .select("*")

      if (error) {
        console.log(error)
        return
      }

      if (data) {
        return data
      }
    } catch (error) {
      console.error("Erro ao buscar todos os cursos")
    }
  }

  export async  function getCoursesByTrail(idTrail: string) {
    if (!idTrail) return;

    try {
      const { data, error } = await supabase
        .from("cursosTrilha")
        .select(`
            id,
            created_at,
            fkTrilha,
            fkCurso,
            curso (
              id,
              titulo,
              descricao,
              created_at,
              "order"
            )
          `)
        .eq("fkTrilha", idTrail);

      if (error) {
        console.log('erro do get courses by trail')
        console.log(error)
        return
      };

      if (data) {
        const DataCourses: TrilhaCurso[] = data.map((item: any) => ({
          created_at: item.created_at,
          curso: item.curso,
          fkCurso: item.fkCurso,
          fkTrilha: item.fkTrilha,
        }));    
        return DataCourses;
      }
    } catch (error) {
      console.error("Erro ao buscar cursos pela trilha:", error);
    }
  }