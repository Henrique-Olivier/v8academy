import { getLessons } from "@/service/requisitions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IGroupLessons, ILessons, ModuloComAulas } from "./types";
import { supabase } from "@/service/supabase";

export default function useLessons() {
    const [listModulesGroups, setListModulesGroups] = useState<{modulo: string, aulas: ILessons[] }[]>([]);
    const [countModulesAndLessons, setCountModulesAndLessons] = useState<{modulos: number, aulas: number}>();
    const [course, setCourse] = useState("");
    const [trail, setTrail] = useState("");

    const router = useRouter();
    const { idCourse } = router.query;

    async function getCourse() {
      try {
        const { data, error } = await supabase
          .from("curso")
          .select("*")
          .eq("id", idCourse)
        if (error) {
          console.log(error)
          return
        }
  
        if (data && data.length !== 0) {
          setCourse(data[0].titulo)
        }
      } catch (error) {
        console.error("Erro ao buscar trilha:", error);
      }
    }

    async function getTrail() {
      try {
        const { data, error } = await supabase
          .from("trilha")
          .select("titulo, cursosTrilha!inner()")
          .eq("cursosTrilha.fkCurso", idCourse);
        if (error) {
          console.log(error)
          return
        }
  
        if (data && data.length !== 0) {
          setTrail(data[0].titulo);
        }
      } catch (error) {
        console.error("Erro ao buscar trilha:", error);
      }
    }

    useEffect(() => {
        (async function () {
            await getCourse();
            await getTrail();

            if(idCourse) {
                const res = await getLessons(idCourse);
                console.log(res);
                const resMapping: ILessons[] = res.map(item => {
                    const idAula: number = item.idAula;
                    const titulo: string = item.titulo;
                    const modulo: string = item.modulo.titulo;

                    return {
                        idAula,
                        titulo,
                        modulo
                    }
                })

                const modulesGroup = agruparAulasPorModulo(resMapping);

                const modulesArray = transformarEmArray(modulesGroup);
                const count = contarModulosEAulas(modulesArray);

                setCountModulesAndLessons(count);
                setListModulesGroups(modulesArray);

            }
        })();
    }, [idCourse]);

    function agruparAulasPorModulo(lessons: ILessons[]) {
        // Usando reduce para agrupar as lessons por módulo
        return lessons.reduce((acumulador: IGroupLessons, lesson: ILessons) => {
          // Verifica se já existe uma entrada para o módulo
          const moduloTitulo = lesson.modulo;
      
          // Se não existir, cria uma nova entrada no acumulador
          if (!acumulador[moduloTitulo]) {
            acumulador[moduloTitulo] = [];
          }
      
          // Adiciona a aula ao array do módulo correspondente
          acumulador[moduloTitulo].push({
            idAula: lesson.idAula,
            titulo: lesson.titulo,
            modulo: lesson.modulo
          });

          return acumulador;
        }, {});
    };

    function transformarEmArray(groupLessons: IGroupLessons) {
        return Object.keys(groupLessons).map(moduloTitulo => ({
          modulo: moduloTitulo,
          aulas: groupLessons[moduloTitulo]
        }));
    };

    function redirectToLesson(idVideo: string) {
        router.push(`/player/${idVideo}`);
    }

    function contarModulosEAulas(modulos: ModuloComAulas[]): { modulos: number; aulas: number } {
        let totalModulos = modulos.length;  // O número de módulos é o tamanho do array
        let totalAulas = 0;
      
        // Percorrendo os módulos e contando as aulas
        modulos.forEach(modulo => {
          totalAulas += modulo.aulas.length;  // Adiciona a quantidade de aulas no módulo
        });
      
        return { modulos: totalModulos, aulas: totalAulas };
      }

    return { trail, course, listModulesGroups, redirectToLesson, countModulesAndLessons };
}