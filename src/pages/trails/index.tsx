import Image from "next/image";
import { MainContainer } from "./styles";
import searchIcon from "../../assets/search_icon.svg";
import { ITrails } from "./types";
import useTrails from "./hooks";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { Button, Modal } from "react-bootstrap";

export default function Trails() {

    const { isAdmin, modal, listTrails, deleteTrail } = useTrails();
    const router = useRouter();

    function showTrials(listTrails: ITrails[]) {
        return listTrails.map(item => (
            <>
                <div className="card" key={item.id}>
                    <img src="https://bfogzwmikqkepnhxrjyt.supabase.co/storage/v1/object/public/v8academy-images/imagem_teste.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{item.titulo}</h5>
                        <p className="card-text">{item.descricao}</p>
                        { isAdmin ?
                            <div className="action-admin">
                                <Button variant="primary" onClick={() => router.push(`/manageTrail/edit/${item.id}`)}>Editar</Button>
                                <Button variant="danger" onClick={() => {modal.handleShow(); modal.edit(item.id, item.titulo)}}>Excluir</Button>
                            </div>
                        :
                            <a className="btn btn-primary" data-idtrail={item.id} onClick={() => {
                                router.push(`/courses/${item.id}`)
                            }}> Ver cursos</a>
                        }
                    </div>
                </div>
            </>
        ))
    }

    return (
        <Layout>
            <MainContainer>

            <Modal show={modal.show} onHide={modal.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modal.header}</Modal.Title>
                </Modal.Header>

                <Modal.Body>Deseja realmente excluir esta trilha?</Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={modal.handleClose}>
                    Fechar
                </Button>
                <Button variant="danger" onClick={deleteTrail}>
                    Excluir
                </Button>
                </Modal.Footer>
            </Modal>

                <h1>Todas as trilhas</h1>

                <div className="search">
                    <div className="input-group flex-nowrap">
                        <input type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="addon-wrapping" />
                        <span className="input-group-text" id="addon-wrapping"><Image src={searchIcon} alt="Icon de procura" /></span>
                    </div>

                    { isAdmin ? <Button onClick={() => router.push("manageTrail/add")}>Adicionar</Button> : <></> }
                </div>

                <div className="cards">
                    {showTrials(listTrails)}
                </div>
            </MainContainer>
        </Layout>
    );
}