import Layout from "@/components/Layout";
import { Accordion, Button } from "react-bootstrap";
import { AccordionContainer, MainContainer } from "./styles";
import useLessons from "./hook";

export default function Lessons() {

    const { course, listModulesGroups, redirectToLesson, countModulesAndLessons } = useLessons();

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
                <h1>{course}</h1>

                <AccordionContainer>
                    <div className="infos">
                        <h4>Total de Módulos: {countModulesAndLessons?.modulos}</h4>
                        <h5>Total de Aulas: {countModulesAndLessons?.aulas}</h5>
                    </div>
                    <Accordion defaultActiveKey="0">
                        {showModules()}
                        {/* <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item> */}
                    </Accordion>
                </AccordionContainer>
            </MainContainer>
        </Layout>
    );
}