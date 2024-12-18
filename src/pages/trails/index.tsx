import Image from "next/image";
import { MainContainer } from "./styles";
import searchIcon from "../../assets/search_icon.svg";

export default function Trails() {
    return (
        <MainContainer>
            <h1>Todas as trilhas</h1>

            <div className="search">
                <div className="input-group flex-nowrap">
                    <input type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="addon-wrapping" />
                    <span className="input-group-text" id="addon-wrapping"><Image src={searchIcon} alt="Icon de procura" /></span>
                </div>
            </div>

            <div className="cards">
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Front-end (React)</h5>
                        <p className="card-text">front-end Trail</p>
                        <a href="#" className="btn btn-primary">Ver cursos</a>
                    </div>
                </div>

                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Front-end (Angular)</h5>
                        <p className="card-text">front-end Trail</p>
                        <a href="#" className="btn btn-primary">Ver cursos</a>
                    </div>
                </div>

                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Back-end</h5>
                        <p className="card-text">back-end Trail</p>
                        <a href="#" className="btn btn-primary">Ver cursos</a>
                    </div>
                </div>

                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Cloud</h5>
                        <p className="card-text">cloud Trail</p>
                        <a href="#" className="btn btn-primary">Ver cursos</a>
                    </div>
                </div>

                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">DevOps & SRE</h5>
                        <p className="card-text">DevOps & SRE Trail</p>
                        <a href="#" className="btn btn-primary">Ver cursos</a>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
}