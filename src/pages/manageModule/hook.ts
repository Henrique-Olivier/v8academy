import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Lesson } from "./types";
import { supabase } from "@/service/supabase";

export default function useManageModule() {
  const router = useRouter();
  const { createOrEdit } = router.query;

  const [titlePage, setTitlePage] = useState("Criar modulo");
  const [idModule, setIdModule] = useState("");
  const [inputModuleTitle, setInputModuleTitle] = useState("");

  const [show, setShow] = useState(false);
  const [textButton, setTextButton] = useState("Adicionar");
  const [titleModal, setTitleModal] = useState("Criar Aula");
  const [listLessons, setListLessons] = useState<Lesson[]>([]);
  const handleClose = () => {
    setShow(false);
    setInputLessonTitle("");
    setInputLessonUrl("");
  };
  const handleShow = () => {
    setShow(true);
    setTextButton("Adicionar");
    setTitleModal("Criar aula")
  }
  const [inputLessonTitle, setInputLessonTitle] = useState('');
  const [inputLessonUrl, setInputLessonUrl] = useState('');
  const [lessonToEdit, setLessonToEdit] = useState<Lesson>({titulo: "", url: ""});

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  if(!createOrEdit) {
    router.push('/trails');
    return;
  }

  const pathUrl = createOrEdit[0];
  const idCourse = createOrEdit[1];

  useEffect(() => {
    if(pathUrl === "edit") {
      setTitlePage("Editar modulo");
      async function getInfosModule(){
        const { data } = await supabase
          .from("modulo")
          .select("id, titulo")
          .eq("id", idCourse);
        
        if(data) {
          setIdModule(data[0].id);
          setInputModuleTitle(data[0].titulo);

          getLessonsByModule();
        }
      }

      async function getLessonsByModule() {
        const { data } = await supabase
          .from("aula")
          .select("idAula, titulo, url")
          .eq("fkModulo", idModule);

        if(data) {
          setListLessons(data);
        }
      }

      getInfosModule();
    }
  }, [idModule])

  function handleAdd(title: string, url: string) {
    const urlFormatted = `https://${url}`;
    const newLesson = {titulo: title, url: urlFormatted};
    const listFilteredSame = listLessons.filter(lesson => lesson.titulo === lessonToEdit.titulo && lesson.url === lessonToEdit.url);

    if(listFilteredSame.length > 0) {
      const listFiltered = listLessons.filter(lesson => lesson.titulo !== lessonToEdit.titulo && lesson.url !== lessonToEdit.url);
      setListLessons([...listFiltered, newLesson]);
      return;
    }
    setListLessons([...listLessons, newLesson]);
  }

  async function editModule() {
    const { data } = await supabase
      .from("modulo")
      .update({titulo: inputModuleTitle})
      .eq('id', idModule)
      .select("fkCurso");

      if(data) {
        await editLessons();
        setTimeout(() => {
          router.push(`/lessons/${data[0].fkCurso}`);
        }, 3000)
      }

  }

  async function editLessons() {
    const { error } = await supabase
      .from("aula")
      .delete()
      .eq('fkModulo', idModule)

      if(!error) {
        await createLessons(idModule);
      }
  }

  async function createModule() {
    const { data } = await supabase
      .from("modulo")
      .insert({
        titulo: inputModuleTitle,
        fkCurso: idCourse,
      })
      .select("id");

      if(data) {
        console.log(data);
        await createLessons(data[0].id);
        setTimeout(() => {
          router.push(`/lessons/${idCourse}`);
        }, 3000);
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

  async function createLessons(idCourseInserted: string) {
    listLessons.forEach(async (lesson) => {
      const titulo = lesson.titulo;
      const url = lesson.url;

      const { error } = await supabase
        .from("aula")
        .insert({
          titulo,
          url,
          fkModulo: idCourseInserted
        })

        if(!error) {
          showNotification("Modulo e aulas salvos com sucesso!", 3000, "success");
        }
    })
  }

  async function saveModule() {
    if(pathUrl === "create") {
      await createModule();
    } else if(pathUrl === "edit") {
      await editModule();
    }
  }

  function removeFromList(titulo: string, url: string) {
    setListLessons(listLessons.filter(lesson => lesson.titulo !== titulo && lesson.url !== url));
  }

  function editLessonFromList(titulo: string, url: string) {
    handleShow();
    setInputLessonTitle(titulo);
    setTextButton("Editar");
    setTitleModal("Editar aula")

    const urlFormatted = url.replace(/https:\/\//, "");
    setInputLessonUrl(urlFormatted);
    setLessonToEdit({titulo, url});
  }

  return {
    titlePage,
    lessons: {
      listLessons,
      add: handleAdd,
    },
    inputModule: {
      value: inputModuleTitle,
      update: setInputModuleTitle
    },
    modal: {
      textButton,
      titleModal,
      show,
      handleClose,
      handleShow,
      input: {
        title: {
          value: inputLessonTitle,
          update: setInputLessonTitle,
        },
        url: {
          value: inputLessonUrl,
          update: setInputLessonUrl,
        }
      }
    },
    saveModule,
    toast: {
      show: {
        value: showToast,
        set: setShowToast
      },
      message: toastMessage,
      type: toastType
    },
    removeFromList,
    editLessonFromList
  }
}