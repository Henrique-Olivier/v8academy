import Layout from "@/components/Layout";
import { supabase } from "@/service/supabase";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX, use, useEffect, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";
import searchIcon from "../../assets/search_icon.svg";
import Modal from 'react-bootstrap/Modal';

import styled from "styled-components";

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
width: 60%;
padding: 10px 10px;
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
        setIsAdmin(false)
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
        setCourses(DataCourses);
      }
    } catch (error) {
      console.error("Erro ao buscar cursos pela trilha:", error);
    }
  }

  async function getTrail() {
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

  function showCourses(courses: TrilhaCurso[]) {
    if (courses) {
      return courses.map((course) => (

        <Card style={{ width: '18rem' }} key={course.curso.id}>
          <Card.Body>
            <Card.Title>{course.curso.titulo}</Card.Title>
            <Card.Text>
              {course.curso.descricao}
            </Card.Text>
          </Card.Body>
          <DivBtn>
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
            </Card.Body>
            <DivBtn>
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
    }
  }

  async function addCourse() {
    if(!title || !description || !order) {
      console.log('Preencha todos os campos')
      return
    }


    try {
      const { data , error } = await supabase
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
        return
      }

      if(data) {
        console.log(data)

        if (idTrail == "0") {
          getAllCourses()
          changeModalState()
        } else {

          const { data: trailData , error: trailError } = await supabase
          .from("cursosTrilha")
          .insert([
            {
              fkTrilha: idTrail,
              fkCurso: data[0].id
            }
          ])

          if(trailError) {
            console.log(trailError)
            return
          }

          console.log(trailData + 'sucesso')
          
          changeModalState()
          getCoursesByTrail()
        }
      }



    } catch (error) {
      console.error("Erro ao adicionar curso:")
    }
  }

  return (
    <Layout>
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
            <Form.Control value={title} onChange={e => {setTitle(e.target.value)}}  aria-describedby="basic-addon3" />
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
        <Modal.Footer>
          <Button variant="danger" onClick={changeModalState}>Cancelar</Button>
          <Button onClick={addCourse}>Adiconar</Button>
        </Modal.Footer>
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