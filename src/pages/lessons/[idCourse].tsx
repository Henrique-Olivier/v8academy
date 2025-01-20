import Layout from "@/components/Layout";
import { Accordion, Button } from "react-bootstrap";
import { AccordionContainer, MainContainer } from "./styles";
import useLessons from "./hook";

export default function Lessons() {

    const { isAdmin, trail, course, listModulesGroups, redirectToLesson, redirectToCreateModule, countModulesAndLessons } = useLessons();

    function showModules() {
        let count = 0;

        return listModulesGroups.map(item => {
            count++;
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
                
                {isAdmin && (<div className="adm"><Button onClick={redirectToCreateModule}>Criar módulo</Button></div>)}

                <AccordionContainer $admin={isAdmin}>
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