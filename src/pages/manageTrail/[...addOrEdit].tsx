import Layout from "@/components/Layout";
import { FormContainer, MainLayout } from "./style";
import { Button, Form, InputGroup, Modal, Table, Toast } from "react-bootstrap";
import useManageTrail from "./hook";

export default function manageTrail() {

    const manageTrailData = useManageTrail();

    if (!manageTrailData) {
        return <div>Error loading trail data</div>;
    }

    const { titlePage, inputTitleTrail, inputDescriptionTrail, courses, modal, saveTrail, deleteFromListCourses, toast } = manageTrailData;

    function listCoursesSelect() {
        return modal.select.listCourses.map(item => (
            <option value={item.id}>{item.nome}</option>
        ))
    }

    function showCourses() {
        return courses.listCourses.map(item => (
            <tr>
                <td>{item.nome}</td>
                <td><Button variant="danger" onClick={() => deleteFromListCourses(item.id)}>Excluir da trilha</Button></td>
            </tr>
        ))
    }

    return (
        <Layout>
            <MainLayout>
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
                <div className="manageTrail">
                    <h1>{titlePage}</h1>
                    <Button variant="success" onClick={saveTrail}>Salvar</Button>
                </div>
                <FormContainer>
                    <Form.Label htmlFor="title-trail" className="mb-1">Titulo da trilha:</Form.Label>
                    <InputGroup className="w-50 mb-2">
                        <Form.Control
                        id="title-trail"
                        placeholder="Ex: Front-end(React)"
                        value={inputTitleTrail.value}
                        onChange={e => inputTitleTrail.onChange(e.target.value)}
                        />
                    </InputGroup>

                    <Form.Label htmlFor="description-trail" className="mb-1">Descrição da trilha:</Form.Label>
                    <InputGroup className="w-50 mb-2">
                        <Form.Control
                        id="description-trail"
                        placeholder="Ex: Trilha para desenvolvedores front-end que desejam aprender React"
                        as="textarea"
                        value={inputDescriptionTrail.value}
                        onChange={e => inputDescriptionTrail.onChange(e.target.value)}
                        />
                    </InputGroup>

                    <Modal show={modal.show} onHide={modal.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{modal.titleModal}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Select aria-label="Default select example" onChange={e => modal.select.onchange({id: Number(e.currentTarget.value), nome: e.currentTarget.options[e.currentTarget.selectedIndex].text })}>
                                {listCoursesSelect()}
                            </Form.Select>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={modal.handleClose}>
                                Fechar
                            </Button>
                            <Button variant="primary" onClick={() => courses.add([...courses.listCourses,  modal.select.value])}>
                                Adicionar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div>
                        <div className="header">
                            <h1>Cursos:</h1>
                            <Button variant="primary" onClick={modal.handleShow}>Adicionar curso</Button>
                        </div>
                    </div>

                    <Table striped>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showCourses()}
                        </tbody>
                    </Table>
                </FormContainer>
            </MainLayout>
        </Layout>
    );
}