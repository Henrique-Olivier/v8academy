

import Layout from "@/components/Layout";
import Image from "next/image";
import { Button, Form, InputGroup, Toast } from "react-bootstrap";
import searchIcon from "../../assets/search_icon.svg";
import { ContainerContent, Header, InputBox, SearchBar } from "../../components/courses/style";
import useCourse from "../../components/courses/hooks";
import CoursesList from "@/components/courses/CoursesList/CourseList";
import { useCourseContext } from "@/context/ProviderCourses";
import CourseModal from "@/components/courses/CoursesModal";


export default function CoursePage() {

  const {
    changeModalState,
    inputSearch,
    setInputSearch,
    setShowToast,
    showToast,
    toastMessage,
    toastType,
    trail,
  } = useCourse();

  const {isAdmin} = useCourseContext();


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

        <CourseModal />

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

          <CoursesList />

        </ContainerContent>
      </Layout>

  );
}