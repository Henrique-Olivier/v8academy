import Layout from "@/components/Layout";
import { Accordion, Button, Modal, Toast } from "react-bootstrap";
import { AccordionContainer, MainContainer } from "../../components/lessons/styles";
import useLessons from "../../components/lessons/hook";

export default function Lessons() {

    const { isAdmin, trail, course, listModulesGroups, redirectToLesson, redirectToCreateModule, redirectToEditModule, countModulesAndLessons, handleCloseModal, handleShowModal, modalShow, modalBody, idDeleteModule, deleteModule, toast } = useLessons();

    function showModules() {
        let count = 0;

        return listModulesGroups.map(item => {
            count++;
            return (
                <Accordion.Item eventKey={count.toString()}>
                    <Accordion.Header className="">
                        {/* <div className="me-4">
                            <Button className="me-2" onClick={() => redirectToEditModule(item.idModulo)}>Editar</Button>
                            <Button variant="danger" onClick={() => deleteModule(item.idModulo)}>Excluir</Button>
                        </div> */}
                        {item.modulo}
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="lesson">
                            <div className="adm-module">
                                <Button className="me-2" onClick={() => redirectToEditModule(item.idModulo)}>Editar modulo</Button>
                                <Button variant="danger" onClick={() => handleShowModal(item.modulo, item.idModulo)}>Excluir modulo</Button>
                            </div>
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
            <Toast
                onClose={() => toast.show.set(false)}
                show={toast.show.value}
                delay={3000}
                autohide
                style={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    zIndex: 9999,
                }}
                bg={toast.type === "success" ? "success" : "danger"}
            >
                <Toast.Header>
                    <strong className="me-auto">{toast.type === "success" ? "Success" : "Error"}</strong>
                </Toast.Header>
                <Toast.Body>{toast.message}</Toast.Body>
            </Toast>
            <Modal show={modalShow} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir modulo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="danger" onClick={() => deleteModule(idDeleteModule)}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
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