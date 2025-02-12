import Layout from "@/components/Layout";
import useManageModule from "../../components/manageModule/hook";
import { FormContainer, MainLayout } from "../../components/manageModule/style";
import { Button, Form, InputGroup, Modal, Table, Toast } from "react-bootstrap";

export default function ManageModule() {
  const manageModuleData = useManageModule();

  if(!manageModuleData) {
    return null;
  }

  const { titlePage, inputModule, lessons, modal, saveModule, toast, removeFromList, editLessonFromList } = manageModuleData;

  function showLessons() {
    return lessons.listLessons.map(item => (
      <tr>
        <td>{item.titulo}</td>
        <td>
          <Button className="btn-edit" variant="primary" onClick={() => editLessonFromList(item.titulo, item.url)}>Editar</Button>
          <Button variant="danger" onClick={() => removeFromList(item.titulo, item.url)}>Excluir</Button>
        </td>
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
              <Button variant="success" onClick={saveModule}>Salvar</Button>
          </div>
          <FormContainer>
              <Form.Label htmlFor="title-trail" className="mb-1">Titulo do modulo:</Form.Label>
              <InputGroup className="w-50 mb-2">
                  <Form.Control
                  id="title-trail"
                  placeholder="Ex: primeiros passos com react"
                  value={inputModule.value}
                  onChange={e => inputModule.update(e.target.value)}
                  />
              </InputGroup>

              <Modal show={modal.show} onHide={modal.handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>{modal.titleModal}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Form.Label htmlFor="inputPassword5">Titulo:</Form.Label>
                    <Form.Control
                      type="text"
                      id="inputTitleLesson"
                      aria-describedby="titleLessonBlock"
                      value={modal.input.title.value}
                      onChange={e => modal.input.title.update(e.target.value)}
                    />

                    <Form.Label htmlFor="inputPassword5">URL:</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon3">
                        https://
                      </InputGroup.Text>
                      <Form.Control
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        value={modal.input.url.value}
                        onChange={e => modal.input.url.update(e.target.value)}  
                      />
                    </InputGroup>
                  </Modal.Body>

                  <Modal.Footer>
                      <Button variant="secondary" onClick={modal.handleClose}>
                          Fechar
                      </Button>
                      <Button variant="primary" onClick={() => lessons.add(modal.input.title.value, modal.input.url.value)}>
                        {modal.textButton}
                      </Button>
                  </Modal.Footer>
              </Modal>

              <div>
                  <div className="header">
                      <h1>Aulas:</h1>
                      <Button variant="primary" onClick={modal.handleShow}>Criar aula</Button>
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
                    {showLessons()}
                  </tbody>
              </Table>
          </FormContainer>
      </MainLayout>
    </Layout>
  );
}