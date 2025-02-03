import Layout from "@/components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Card, Form, InputGroup, Toast } from "react-bootstrap";
import searchIcon from "../../assets/search_icon.svg";
import Modal from 'react-bootstrap/Modal';
import { ContainerContent, Header, InputBox, GridCourses, DivBtn, SearchBar } from "../../components/courses/style";
import { TrilhaCurso, Curso} from "../../components/courses/types";
import useCourse from "../../components/courses/hooks";

export default function CoursePage() {
  const router = useRouter();
  const { isAdmin,
    OpenConfirmRemove,
    addCourse,
    allCourses,
    changeModalState,
    closeModalRemove,
    editCourse,
    getCourseName,
    idToEdit,
    inputSearch,
    isModalEdit,
    isModalRemove,
    order,
    removeCourse,
    setDescription,
    setInputSearch,
    setOrder,
    setShowToast,
    setTitle,
    showModal,
    showToast,
    title,
    toastMessage,
    toastType,
    trail,
    courses,
    openEditCourse,
    description
  } = useCourse();


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
              <input value={inputSearch} onChange={e => setInputSearch(e.target.value)} type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="addon-wrapping" />
              <span className="input-group-text" id="addon-wrapping"><Image src={searchIcon} alt="Icon de procura" /></span>
            </div>
          </SearchBar>

          {isAdmin ? <Button variant="primary" onClick={changeModalState}>Adicionar Curso</Button> : ''}
        </InputBox>

        <GridCourses>
          {courses.length > 0 ? showCourses(courses) : allCourses.length > 0 ? showAllCourses(allCourses) :
            <div className="alert alert-warning" role="alert">
              Nenhum curso encontrado
            </div>}
        </GridCourses>

      </ContainerContent>
    </Layout>
  );
}