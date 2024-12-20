import Layout from "@/components/Layout";
import { Accordion, Button } from "react-bootstrap";
import { AccordionContainer, MainContainer } from "./styles";
import useLessons from "./hook";

export default function Lessons() {

    const { trail, course, listModulesGroups, redirectToLesson, countModulesAndLessons } = useLessons();

    function showModules() {
        return listModulesGroups.map(item => {
            return (
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{item.modulo}</Accordion.Header>
                    <Accordion.Body>
                        <div className="lesson">
                            {item.aulas.map(item => (
                                <>
                                    <p>{item.titulo}</p>
                                    <Button onClick={() => redirectToLesson(item.idAula.toString())} variant="primary">Assistir aula</Button>
                                </>
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            );
        })
    }

    return (
        <Layout>
            <MainContainer>
                <p>{`${trail} > curso:`}</p>
                <h1>{course}</h1>

                <AccordionContainer>
                    <div className="infos">
                        <h4>Total de Módulos: {countModulesAndLessons?.modulos}</h4>
                        <h5>Total de Aulas: {countModulesAndLessons?.aulas}</h5>
                    </div>
                    <Accordion defaultActiveKey="0">
                        {showModules()}
                    </Accordion>
                </AccordionContainer>
            </MainContainer>
        </Layout>
    );
}