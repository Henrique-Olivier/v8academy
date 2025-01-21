import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Lesson } from "./types";
import { supabase } from "@/service/supabase";

export default function useManageModule() {
  const router = useRouter();
  const { createOrEdit } = router.query;

  const [inputModuleTitle, setInputModuleTitle] = useState("");

  const [show, setShow] = useState(false);
  const [titleModal, setTitleModal] = useState("Criar Aula");
  const [listLessons, setListLessons] = useState<Lesson[]>([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputLessonTitle, setInputLessonTitle] = useState('');
  const [inputLessonUrl, setInputLessonUrl] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  if(!createOrEdit) {
    router.push('/trails');
    return;
  }

  const pathUrl = createOrEdit[0];
  const idCourse = createOrEdit[1];

  function handleAdd(title: string, url: string) {
    const newLesson = {titulo: title, url}
    setListLessons([...listLessons, newLesson])
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
        createLessons(data[0].id);
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

  function createLessons(idCourseInserted: string) {
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
          showNotification("Modulo e aulas criados com sucesso!", 3000, "success");
          router.push(`/lessons/${idCourseInserted}`);
        }
    })
  }

  async function saveModule() {
    if(pathUrl === "create") {
      await createModule();
    } else if(pathUrl === "edit") {

    }
  }

  return {
    createOrEdit,
    lessons: {
      listLessons,
      add: handleAdd,
    },
    inputModule: {
      value: inputModuleTitle,
      update: setInputModuleTitle
    },
    modal: {
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
    }
  }
}