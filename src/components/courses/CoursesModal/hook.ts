import { useCourseContext } from "@/context/ProviderCourses";
import { supabase } from "@/service/supabase";
import { useModalContext } from "@/context/ProviderModal";
import useCourse from "../hooks";
import { getCoursesByTrail } from "@/service/requisitions";

export default function useCourseModal() {

    const { setShowModal, setIsModalEdit, setIdToEdit, setIsModalRemove, idToEdit, idTrail, allCourses, courses, updateCourses } = useCourseContext();
    const { title, setTitle, description, setDescription, order, setOrder } = useModalContext();
    const { addCourse } = useCourse()

    function closeModal() {
        setShowModal(false);
    }

    function openModal() {
        setShowModal(true);
    }

    async function openEditCourse(idCourse: number) {
        setIdToEdit(idCourse)

        try {
            const { data, error } = await supabase
                .from('curso')
                .select('*')
                .eq('id', idCourse)

            if (data) {
                console.log(data)

                setTitle(data[0].titulo)
                setDescription(data[0].descricao)
                setOrder(data[0].order)
                setIsModalEdit(true)
                openModal()
            }

            if (error) {
                console.log(error)
            }
        } catch (error) {
            console.error(error)
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
                // showNotification("Erro ao remover curso", 3000, "error");
                return
            }


            const { error: error2 } = await supabase
                .from("curso")
                .delete()
                .eq("id", idToEdit)

            if (error2) {
                console.log(error2)
                // showNotification("Erro ao remover curso", 3000, "error");
                return
            }

            closeModalRemove()
            if (idTrail == '0') {
                // showNotification("Curso removido com sucesso", 3000, "success");
            } else {
                getCoursesByTrail(idTrail as string)
                // showNotification("Curso removido com sucesso", 3000, "success");
            }



        } catch (error) {
            console.error("Erro ao remover curso:", error)
            // showNotification("Erro ao remover curso", 3000, "error");
        } finally {
            updateCourses()
        }
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

    function handleAddCourse() {
        addCourse(title, description, order)
    }

    function openModalRemove() {
        setIsModalRemove(true);
    }

    function closeModalRemove() {
        setIsModalRemove(false);
    }

    function OpenConfirmRemove() {
        openModalRemove();
        closeModal();
    }


    return {
        closeModal,
        openModal,
        handleAddCourse,
        openEditCourse,
        OpenConfirmRemove,
        closeModalRemove,
        removeCourse,
        getCourseName
    }
}