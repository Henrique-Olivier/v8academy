import Layout from "@/components/Layout";
import { Accordion, Button } from "react-bootstrap";
import { AccordionContainer, MainContainer } from "../../components/lessons/styles";
import useLessons from "../../components/lessons/hook";

export default function Lessons() {

    const { trail, course, listModulesGroups, redirectToLesson, countModulesAndLessons } = useLessons();

    function showModules() {
        let count = 0;

        return listModulesGroups.map(item => {
            count++;
            console.log(item)
            console.log(count)
            return (
                <Accordion.Item eventKey={count.toString()}>
                    <Accordion.Header>{item.modulo}</Accordion.Header>
                    <Accordion.Body>
                        <div className="lesson">
                            {item.aulas.map(item => (
                                <div>
                                    <p>{item.titulo}</p>
                                    <Button onClick={() => redirectToLesson(item.idAula.toString())} variant="primary">Assistir aula</Button>
                                </div>
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
                    <Accordion>
                        {showModules()}
                    </Accordion>
                </AccordionContainer>
            </MainContainer>
        </Layout>
    );
}