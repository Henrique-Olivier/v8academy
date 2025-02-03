import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Curso, Trilha, TrilhaCurso } from "./types";
import { supabase } from "@/service/supabase";

export default function useCourse () {
    const router = useRouter();
    const { idTrail } = router.query;
    const [courses, setCourses] = useState<TrilhaCurso[]>([]);
    const [trail, setTrail] = useState<Trilha>();
    const [allCourses, setAllCourses] = useState<Curso[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState(0);
    const [inputSearch, setInputSearch] = useState('');
  
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalRemove, setIsModalRemove] = useState(false);
    const [idToEdit, setIdToEdit] = useState(0);
  
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
  
    useEffect(() => {
  
      authenticate()
      if (idTrail == "0") {
        getAllCourses()
      } else {
        getCoursesByTrail()
        getTrail()
      }
  
    }, [idTrail])
  
    useEffect(() => {
      if (inputSearch !== '') {
        filterCourses()
      } else {
        if (idTrail == '0') {
          getAllCourses()
        } else {
          getCoursesByTrail()
        }
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
  
    async function authenticate() {
      const userObject = localStorage.getItem("sb-bfogzwmikqkepnhxrjyt-auth-token");
      if (userObject) {
        const parsedUserObject = JSON.parse(userObject)
  
        const userId = parsedUserObject.user.id
  
        const { data, error } = await supabase
          .from('usuario')
          .select('*')
          .eq('id', userId)
  
        if (error) {
          return
        }
  
        if (data[0].isAdmin) {
          setIsAdmin(true);
  
          console.log('admin')
        } else {
          setIsAdmin(false);
        }
      } else {
        router.push('/login')
      }
    }
  
    async function getAllCourses() {
      'use client'
  
      try {
        const { data, error } = await supabase
          .from("curso")
          .select("*")
  
        if (error) {
          console.log(error)
          return
        }
  
        if (data) {
          setAllCourses(data)
          console.log(data)
        }
      } catch (error) {
        console.error("Erro ao buscar todos os cursos")
      }
    }
  
    async function getCoursesByTrail() {
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
          console.log("adicionando cursos ...")
          setCourses(DataCourses);
        }
      } catch (error) {
        console.error("Erro ao buscar cursos pela trilha:", error);
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
  
    function openEditCourse(idCourse: number) {
      console.log("editar")
      changeModalState()
      setIdToEdit(idCourse)
  
      if (idTrail == '0') {
        const course = allCourses.find(course => course.id === idCourse)
        if (course) {
          setTitle(course.titulo)
          setDescription(course.descricao)
          setOrder(course.order)
          setIsModalEdit(true)
        }
      } else {
        const course = courses.find(course => course.curso.id === idCourse)
  
        if (course) {
          setTitle(course.curso.titulo)
          setDescription(course.curso.descricao)
          setOrder(course.curso.order)
          setIsModalEdit(true)
        }
  
      }
  
  
    }
  


  
    function changeModalState() {
      setShowModal(!showModal)
  
      if (!showModal) {
        setTitle('')
        setDescription('')
        setOrder(0)
        setIsModalEdit(false)
      }
    }
  
  
  
    async function addCourse() {
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
            getAllCourses()
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
            getCoursesByTrail()
          }
        }
  
      } catch (error) {
        console.error("Erro ao adicionar curso:")
        showNotification("Erro ao adicionar curso", 3000, "error");
      }
    }
  
  
  
  
    function openModalRemove() {
      setIsModalRemove(true);
    }
  
    function closeModalRemove() {
      setIsModalRemove(false);
    }
  
    function OpenConfirmRemove() {
      openModalRemove();
      changeModalState();
    }
  
    function getCourseName(idCourse: number) {
      if (idTrail == '0') {
        const course = allCourses.find(course => course.id === idCourse)
        if (course) {
          return course.titulo
        }
      } else {
        const course = courses.find(course => course.curso.id === idCourse)
  
        if (course) {
          return course.curso.titulo
        }
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
            getAllCourses()
            changeModalState()
            showNotification("Curso editado com sucesso", 3000, "success");
          } else {
            getCoursesByTrail()
            changeModalState()
            showNotification("Curso editado com sucesso", 3000, "success");
          }
        }
  
      } catch (error) {
        console.error("Erro ao adicionar curso:")
        showNotification("Erro ao editar curso", 3000, "error");
      }
    }
  
    async function removeCourse() {
      try {
        const { error } = await supabase
          .from("cursosTrilha")
          .delete()
          .eq("fkCurso", idToEdit)
  
        if (error) {
          console.log(error)
          showNotification("Erro ao remover curso", 3000, "error");
          return
        }
  
  
        const { error: error2 } = await supabase
          .from("curso")
          .delete()
          .eq("id", idToEdit)
  
        if (error2) {
          console.log(error2)
          showNotification("Erro ao remover curso", 3000, "error");
          return
        }
  
        closeModalRemove()
        if (idTrail == '0') {
          getAllCourses()
          showNotification("Curso removido com sucesso", 3000, "success");
        } else {
          getCoursesByTrail()
          showNotification("Curso removido com sucesso", 3000, "success");
        }
  
  
  
      } catch (error) {
        console.error("Erro ao remover curso:", error)
        showNotification("Erro ao remover curso", 3000, "error");
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
        isAdmin,
        showModal,
        title,
        description,
        order,
        inputSearch,
        isModalEdit,
        isModalRemove,
        idToEdit,
        showToast,
        toastMessage,
        toastType,
        filterCourses,
        authenticate,
        getAllCourses,
        getCoursesByTrail,
        getTrail,
        openEditCourse,
        changeModalState,
        addCourse,
        openModalRemove,
        closeModalRemove,
        OpenConfirmRemove,
        getCourseName,
        editCourse,
        removeCourse,
        showNotification,
        setTitle,
        setDescription,
        setOrder,
        setInputSearch,
        setShowModal,
        setIsModalEdit,
        setIsModalRemove,
        setIdToEdit,
        setShowToast,
        setToastMessage,
        setToastType
    };
}