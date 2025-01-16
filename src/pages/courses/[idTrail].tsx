import Layout from "@/components/Layout";
import { supabase } from "@/service/supabase";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX, use, useEffect, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup, Toast } from "react-bootstrap";
import searchIcon from "../../assets/search_icon.svg";
import Modal from 'react-bootstrap/Modal';

import styled from "styled-components";
import { get } from "http";

const ContainerContent = styled.div`
width: 100%;
height: 100%;
max-height: 100%;
overflow-y: auto;
display: flex;
flex-direction: column;

.input-group-text{
background-color: #2D71D6;
}
`
const Header = styled.div`
width: 100%;
height: 120px;
border-bottom: 1px solid #4E4E4E;
display: flex;
flex-direction: column;
margin-bottom: 24px;
padding: 50px 0px 5px 80px;
gap: 5px;

p {
margin: 0;
}

 h1 {
 margin: 0;
 font-size: 26px;
 }
`

const InputBox = styled.div`
width: 100%;
padding: 10px 80px; 
display: flex;
flex direction: row;
gap: 5px;
justify-content: space-between;
`

const GridCourses = styled.div`
width: 100%;
padding: 10px 80px;
display: grid;
grid-template-columns: 18rem 18rem 18rem;
gap: 40px;
`
const DivBtn = styled.div`
width: 100%;
padding: 10px 10px;
display: flex;
justify-content: space-between; 
`
const SearchBar = styled.div`
width: 70%;
`

interface TrilhaCurso {
  created_at: string;
  curso: {
    descricao: string;
    id: number;
    order: number;
    titulo: string;
  }
  fkCurso: number;
  fkTrilha: number;
}

interface Trilha {
  descricao: string;
  id: number;
  titulo: string;
}

interface Curso {
  descricao: string;
  id: number;
  order: number;
  titulo: string;
}

export default function CoursePage() {

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

  function showCourses(courses: TrilhaCurso[]) {
    if (courses) {
      return courses.map((course, index) => (

        <Card style={{ width: '18rem' }} key={index}>
          <Card.Body>
            <Card.Title>{course.curso.titulo}</Card.Title>
            <Card.Text>
              {course.curso.descricao}
            </Card.Text>
            {isAdmin ? <Card.Text>
              Ordem: {course.curso.order}
            </Card.Text> : <></>}
          </Card.Body>
          <DivBtn>
            {isAdmin ? <Button variant="primary" onClick={() => {
              openEditCourse(course.curso.id)
            }}>Editar Curso</Button> : <></>}
            <Button variant="primary" onClick={() => {
              router.push(`/lessons/${course.curso.id}`)
            }}>Ver curso</Button>
          </DivBtn>
        </Card>
      ));
    }
    return null;
  }

  function showAllCourses(courses: Curso[]) {
    if (courses) {
      return courses.map((course, index) => (
        <>
          <Card style={{ width: '18rem' }} key={index}>
            <Card.Body>
              <Card.Title>{course.titulo}</Card.Title>
              <Card.Text>
                {course.descricao}
              </Card.Text>
              {isAdmin ? <Card.Text>
                Ordem: {course.order}
              </Card.Text> : <></>}
            </Card.Body>
            <DivBtn>
              {isAdmin ? <Button variant="primary" onClick={() => {
                openEditCourse(course.id)
              }}>Editar Curso</Button> : <></>}
              <Button variant="primary" onClick={() => {
                router.push(`/lessons/${course.id}`)
              }}>Ver curso</Button>
            </DivBtn>
          </Card>
        </>
      ));
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
        showNotification  ("Curso removido com sucesso", 3000, "success");
      } else {
        getCoursesByTrail()
        showNotification  ("Curso removido com sucesso", 3000, "success");
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

  return (
    <Layout>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
        bg={toastType === "success" ? "success" : "danger"}
      >
        <Toast.Header>
          <strong className="me-auto">{toastType === "success" ? "Success" : "Error"}</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      <Modal
        show={isModalRemove}
        onHide={closeModalRemove}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Remover Curso:
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Tem certeza que deseja remover o curso '{getCourseName(idToEdit)}'?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={closeModalRemove}>Cancelar</Button>
          <Button variant="danger" onClick={removeCourse}>Remover</Button>
        </Modal.Footer>

      </Modal>
      <Modal
        show={showModal}
        onHide={changeModalState}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Adicionar Curso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="basic-url">Título:</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control value={title} onChange={e => { setTitle(e.target.value) }} aria-describedby="basic-addon3" />
          </InputGroup>
          <Form.Label htmlFor="basic-url">Descrição:</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control value={description} onChange={e => setDescription(e.target.value)} aria-describedby="basic-addon3" />
          </InputGroup>
          <Form.Label htmlFor="basic-url">Ordem:</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control value={order} onChange={e => setOrder(Number(e.target.value))} aria-describedby="basic-addon3" />
          </InputGroup>
        </Modal.Body>

        {
          isModalEdit ? <Modal.Footer>
            <Button variant="danger" onClick={() => { OpenConfirmRemove() }}>Remover Curso</Button>
            <Button onClick={editCourse}>Salvar Alterações</Button>
            <Button onClick={changeModalState}>Cancelar</Button>
          </Modal.Footer>
            :
            <Modal.Footer>
              <Button variant="danger" onClick={changeModalState}>Cancelar</Button>
              <Button onClick={addCourse}>Adiconar</Button>
            </Modal.Footer>
        }

      </Modal>
      <ContainerContent>
        <Header>
          <p>{trail ? trail.titulo + ' > Cursos' : ''}</p>
          <h1>Todos os cursos:</h1>
        </Header>
        <InputBox>
          <SearchBar>
            <div className="input-group flex-nowrap">
              <input type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="addon-wrapping" />
              <span className="input-group-text" id="addon-wrapping"><Image src={searchIcon} alt="Icon de procura" /></span>
            </div>
          </SearchBar>

          {isAdmin ? <Button variant="primary" onClick={changeModalState}>Adicionar Curso</Button> : ''}
        </InputBox>

        <GridCourses>
          {courses.length > 0 ? showCourses(courses) : showAllCourses(allCourses)}
        </GridCourses>

      </ContainerContent>
    </Layout>
  );
}