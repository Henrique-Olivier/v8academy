import Layout from "@/components/Layout";
import { FormContainer, MainLayout } from "./style";
import { Button, Form, InputGroup, Table } from "react-bootstrap";

export default function manageTrail() {

    return (
        <Layout>
            <MainLayout>
                <h1>Manage Trail</h1>
                <FormContainer>
                    <Form.Label htmlFor="title-trail" className="mb-1">Titulo da trilha:</Form.Label>
                    <InputGroup className="w-50 mb-2">
                        <Form.Control
                        id="title-trail"
                        placeholder="Ex: Front-end(React)"
                        />
                    </InputGroup>

                    <Form.Label htmlFor="description-trail" className="mb-1">Descrição da trilha:</Form.Label>
                    <InputGroup className="w-50 mb-2">
                        <Form.Control
                        id="description-trail"
                        placeholder="Ex: Trilha para desenvolvedores front-end que desejam aprender React"
                        as="textarea"
                        />
                    </InputGroup>

                    <div>
                        <div className="header">
                            <h1>Cursos:</h1>
                            <Button variant="primary">Adicionar curso</Button>
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
                            <tr>
                                <td>HTML Básico</td>
                                <td><Button variant="danger">Excluir da trilha</Button></td>
                            </tr>
                            <tr>
                                <td>FCSS Básico</td>
                                <td><Button variant="danger">Excluir da trilha</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </FormContainer>
            </MainLayout>
        </Layout>
    );
}