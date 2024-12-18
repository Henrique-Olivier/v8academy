import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/service/supabase';
import Layout from '../../components/Layout';
import { ButtonDiv, ContainerContent, Header } from './style';
import { Button, Placeholder, Spinner } from 'react-bootstrap';

const VideoFrame = styled.div`
  width: 100%;
  background-color: #3A3A3A;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Iframe = styled.iframe`
  height: 100%;   
  width: 75%;
`;

interface Aula {
    id: number;
    titulo: string;
    url: string;
    modulo: {
        id: number;
        titulo: string;
        curso: {
            id: number;
            titulo: string;
            descricao: string;
        };
    };
}

export default function AulaPage() {
    const router = useRouter();
    const { idAula } = router.query;
    const [aula, setAula] = useState<Aula | null>(null);

    useEffect(() => {
        if (idAula) {
            getAula();
        }
    }, [idAula]);

    async function getAula() {
        const { data, error } = await supabase
            .from('aula')
            .select(`
        *,
        modulo:fkModulo (
          id,
          titulo,
          curso:fkCurso (
            id,
            titulo,
            descricao
          )
        )
      `)
            .eq('idAula', idAula);

        if (error) {
            console.log(error);
            return;
        }

        if (data) {
            setAula(data[0]);
        }
    }

    if (!aula) {
        return (
            <Layout>
                <ContainerContent>
                    <Header>
                        <Placeholder xs={6} />
                        <Placeholder xs={10} />
                    </Header>
                    <VideoFrame>
                        <Spinner animation="border" variant="light" />
                    </VideoFrame>
                    <ButtonDiv>
                        <Button className='px-5 py-2' variant="primary">
                            Próxima aula
                        </Button>
                    </ButtonDiv>
                </ContainerContent>
            </Layout>
        )
    }

    return (
        <Layout>
            <ContainerContent>
                <Header>
                    <p>{aula && `${aula.modulo.curso.titulo} > ${aula.modulo.titulo}`}</p>
                    <h1>{aula && aula.titulo}</h1>
                </Header>
                <VideoFrame>
                    <Iframe
                        width="560"
                        height="315"
                        src={aula && aula.url}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></Iframe>
                </VideoFrame>
                <ButtonDiv>
                    <Button className='px-5 py-2' variant="primary">
                        Próxima aula
                    </Button>
                </ButtonDiv>
            </ContainerContent>
        </Layout>
    );
}