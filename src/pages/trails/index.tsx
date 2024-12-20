import Image from "next/image";
import { MainContainer } from "./styles";
import searchIcon from "../../assets/search_icon.svg";
import { ITrails } from "./types";
import useTrails from "./hooks";
import Layout from "@/components/Layout";

export default function Trails() {

    const { listTrails } = useTrails();

    function showTrials(listTrails: ITrails[]) {
        return listTrails.map(item => (
            <>
                <div className="card" id={item.id.toString()}>
                    <img src="https://bfogzwmikqkepnhxrjyt.supabase.co/storage/v1/object/public/v8academy-images/imagem_teste.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{item.titulo}</h5>
                        <p className="card-text">{item.descricao}</p>
                        <a href={`/courses/${item.id}`} className="btn btn-primary">Ver cursos</a>
                    </div>
                </div>
            </>
        ))
    }

    return (
        <Layout>
            <MainContainer>
                <h1>Todas as trilhas</h1>

                <div className="search">
                    <div className="input-group flex-nowrap">
                        <input type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="addon-wrapping" />
                        <span className="input-group-text" id="addon-wrapping"><Image src={searchIcon} alt="Icon de procura" /></span>
                    </div>
                </div>

                <div className="cards">
                    {showTrials(listTrails)}
                </div>
            </MainContainer>
        </Layout>
    );
}