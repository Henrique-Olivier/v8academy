import { useCourseContext } from "@/context/ProviderCourses";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import useCourseModal from "./hook";
import { useModalContext } from "@/context/ProviderModal";
import useCourse from "../hooks";

export default function CourseModal() {
    const { isModalEdit, showModal, idToEdit, isModalRemove } = useCourseContext();
    const { editCourse } = useCourse();
    const { description, setDescription, order, setOrder, setTitle, title } = useModalContext();
    const { handleAddCourse, closeModal, OpenConfirmRemove, closeModalRemove, removeCourse, getCourseName } = useCourseModal();

    return (
        <>
            {isModalRemove ? (
                <Modal show={isModalRemove} onHide={closeModalRemove} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Remover Curso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Tem certeza que deseja remover o curso '{getCourseName(idToEdit)}'?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeModalRemove}>Cancelar</Button>
                        <Button variant="danger" onClick={removeCourse}>Remover</Button>
                    </Modal.Footer>
                </Modal>
            ) : (
                <Modal show={showModal} onHide={closeModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{isModalEdit ? "Editar Curso" : "Adicionar Curso"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label htmlFor="basic-url">Título:</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control value={title} onChange={e => setTitle(e.target.value)} />
                        </InputGroup>
                        <Form.Label htmlFor="basic-url">Descrição:</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control value={description} onChange={e => setDescription(e.target.value)} />
                        </InputGroup>
                        <Form.Label htmlFor="basic-url">Ordem:</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control value={order} onChange={e => setOrder(Number(e.target.value))} />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        {isModalEdit ? (
                            <>
                                <Button variant="danger" onClick={OpenConfirmRemove}>Remover Curso</Button>
                                <Button onClick={editCourse}>Salvar Alterações</Button>
                                <Button onClick={closeModal}>Cancelar</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="danger" onClick={closeModal}>Cancelar</Button>
                                <Button onClick={handleAddCourse}>Adicionar</Button>
                            </>
                        )}
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}