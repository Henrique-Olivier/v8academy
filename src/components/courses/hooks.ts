import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Curso, Trilha, TrilhaCurso } from "./types";
import { supabase } from "@/service/supabase";
import { useCourseContext } from "@/context/ProviderCourses";
import useCourseModal from "./CoursesModal/hook";
import { useModalContext } from "@/context/ProviderModal";

export default function useCourse() {

  const [courses, setCourses] = useState<TrilhaCurso[]>([]);
  const [trail, setTrail] = useState<Trilha>();
  const [allCourses, setAllCourses] = useState<Curso[]>([]);
  const [inputSearch, setInputSearch] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const { showModal, setShowModal, idToEdit, isModalEdit, setIdToEdit, setIsModalEdit, idTrail,updateCourses } = useCourseContext();
  const {title, setTitle, description, setDescription, order, setOrder} = useModalContext();

  useEffect(() => {
    if (inputSearch !== '') {
      filterCourses()
    } else {
      updateCourses()
    }
  }, [inputSearch])

  function filterCourses() {
    if (inputSearch) {
      if (idTrail == '0') {
        const filteredCourses = allCourses.filter(course => course.titulo.toLowerCase().includes(inputSearch.toLowerCase()))
        setAllCourses(filteredCourses)
      } else {
        const filteredCourses = courses.filter(course => course.curso.titulo.toLowerCase().includes(inputSearch.toLowerCase()))
        setCourses(filteredCourses)
      }
    } else {
      return courses
    }
  }





  async function getTrail() {
    if (!idTrail) return;

    try {
      const { data, error } = await supabase
        .from("trilha")
        .select("*")
        .eq("id", idTrail)
      if (error) {
        console.log(error)
        return
      }

      if (data) {
        console.log(data)
        setTrail(data[0])
      }
    } catch (error) {
      console.error("Erro ao buscar trilha:", error);
    }
  }


  function changeModalState() {
    console.log("ANTES " + showModal)
    setShowModal(!showModal)
    console.log("DEPOIS" + showModal)


    if (!showModal) {
      setTitle('')
      setDescription('')
      setOrder(0)
      setIsModalEdit(false)
    }
  }



  async function addCourse(title: string, description: string, order: number) {
    if (!title || !description || !order) {
      console.log('Preencha todos os campos')
      return
    }

    try {
      const { data, error } = await supabase
        .from("curso")
        .insert([
          {
            titulo: title,
            descricao: description,
            order: order
          }
        ])
        .select("*")

      if (error) {
        console.log(error)
        showNotification("Erro ao adicionar curso", 3000, "error");
        return
      }

      if (data) {
        console.log(data)

        if (idTrail == "0") {
          updateCourses()
          changeModalState()
        } else {

          const { data: trailData, error: trailError } = await supabase
            .from("cursosTrilha")
            .insert([
              {
                fkTrilha: idTrail,
                fkCurso: data[0].id
              }
            ])

          if (trailError) {
            console.log(trailError)
            return
          }

          console.log(trailData + 'sucesso')
          showNotification("Curso adicionado com sucesso", 3000, "success");

          changeModalState()
          updateCourses()
        }
      }

    } catch (error) {
      console.error("Erro ao adicionar curso:")
      showNotification("Erro ao adicionar curso", 3000, "error");
    }
  }

  async function editCourse() {
    if (!title || !description || !order) {
      console.log('Preencha todos os campos')
      return
    }

    try {
      const { data, error } = await supabase
        .from("curso")
        .update({
          titulo: title,
          descricao: description,
          order: order
        })
        .eq("id", idToEdit)
        .select("*")

      if (error) {
        console.log(error)
        return
      }

      if (data) {
        console.log(data)

        if (idTrail == "0") {
          updateCourses()
          changeModalState()
          showNotification("Curso editado com sucesso", 3000, "success");
        } else {
          updateCourses()
          changeModalState()
          showNotification("Curso editado com sucesso", 3000, "success");
        }
      }

    } catch (error) {
      console.error("Erro ao adicionar curso:")
      showNotification("Erro ao editar curso", 3000, "error");
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
    courses,
    trail,
    allCourses,
    showModal,
    inputSearch,
    showToast,
    toastMessage,
    toastType,
    filterCourses,
    getTrail,
    changeModalState,
    addCourse,
    editCourse,
    showNotification,
    setInputSearch,
    setShowModal,
    setIsModalEdit,
    setIdToEdit,
    setShowToast,
    setToastMessage,
    setToastType,
  };
}