import { getLessons } from "@/service/requisitions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CountModulesAndLessons, IGroupLessons, ILessons, Modules, ModuloComAulas } from "./types";
import { supabase } from "@/service/supabase";

export default function useLessons() {
  const [listModulesGroups, setListModulesGroups] = useState<Modules[]>([]);
  const [countModulesAndLessons, setCountModulesAndLessons] = useState<CountModulesAndLessons>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [course, setCourse] = useState("");
  const [trail, setTrail] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [idDeleteModule, setIdDeleteModule] = useState(0);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const router = useRouter();
  const { idCourse } = router.query;

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
        console.log(data)
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
        console.log(data);
        setTrail(data[0].titulo);
      }
    } catch (error) {
      console.error("Erro ao buscar trilha:", error);
    }
  }

  useEffect(() => {
    authenticate();
      (async function () {
          await getCourse();
          await getTrail();

          if(idCourse) {
              const res = await getLessons(idCourse);
              const resMapping: ILessons[] = res.map((item) => {
                  const idAula: number = item.idAula;
                  const titulo: string = item.titulo;
                  const idModulo = item.modulo.idModulo;
                  const modulo = item.modulo.titulo;

                  return {
                      idAula,
                      titulo,
                      idModulo,
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
          idModulo: lesson.idModulo,
          modulo: lesson.modulo
        });

        return acumulador;
      }, {});
  };

  function transformarEmArray(groupLessons: IGroupLessons) {
      return Object.keys(groupLessons).map(moduloTitulo => ({
        idModulo: groupLessons[moduloTitulo][0].idModulo,
        modulo: moduloTitulo,
        aulas: groupLessons[moduloTitulo]
      }));
  };

  function redirectToLesson(idVideo: string) {
      router.push(`/player/${idVideo}`);
  }

  function redirectToCreateModule() {
    router.push(`/manageModule/create/${idCourse}`);
  }

  function redirectToEditModule(idModule: number) {
    router.push(`/manageModule/edit/${idModule}`);
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

  async function deleteLessonsFromModule(idModule: number) {
    await supabase
      .from("aula")
      .delete()
      .eq("fkModulo", idModule);
  }

  function handleShowModal(modulo: string, id: number) {
    setModalBody(`Deseja deletar o modulo ${modulo}?`);
    setModalShow(true);
    setIdDeleteModule(id);
  }

  function handleCloseModal() {
    setModalShow(false);
  }

  async function deleteModule(idModule: number) {
    await deleteLessonsFromModule(idModule);
    const { error } = await supabase
      .from("modulo")
      .delete()
      .eq("id", idModule);

    if(!error) {
      showNotification("Modulo e aulas deletados com sucesso!", 3000, "success");
      setTimeout(() => {
        router.reload();
      }, 3000)
    }
  }

  function showNotification(message: string, duration: number, type: "error" | "success") {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  }

  return {
    isAdmin,
    trail,
    course,
    listModulesGroups,
    redirectToLesson,
    redirectToCreateModule,
    redirectToEditModule,
    countModulesAndLessons,
    handleShowModal,
    handleCloseModal,
    modalShow,
    modalBody,
    idDeleteModule,
    deleteModule,
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