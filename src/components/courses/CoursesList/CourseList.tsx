import { Button, Card } from "react-bootstrap";
import styled from "styled-components";
import { DivBtn } from "../style";
import { Curso, TrilhaCurso } from "../types";
import { useRouter } from "next/router";
import useCourse from "../hooks";
import { useCourseContext } from "@/context/ProviderCourses";
import useCourseModal from "../CoursesModal/hook";

export const GridCourses = styled.div`
width: 100%;
padding: 10px 80px;
display: grid;
grid-template-columns: 18rem 18rem 18rem;
gap: 40px;
`

export default function CoursesList() {

    const router = useRouter();
    const { isAdmin, courses, allCourses } = useCourseContext();
    const { openEditCourse } = useCourseModal();

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
        <GridCourses>
            {courses.length > 0 ? showCourses(courses) : allCourses.length > 0 ? showAllCourses(allCourses) :
                <div className="alert alert-warning w-50" role="alert">
                    Nenhum curso encontrado
                </div>}
        </GridCourses>

    )
}