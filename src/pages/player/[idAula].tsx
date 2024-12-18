import { supabase } from '@/service/supabase';
import { get } from 'http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ContainerContent, Iframe, VideoFrame, Header, ButtonDiv } from './style'
import Layout from '@/components/Layout';
import { Button } from 'react-bootstrap';
interface Aula {
    id: number;
    titulo: string;
    url: string;
    modulo: Modulo;
}

interface Modulo {
    id: number;
    titulo: string;
    curso: Curso;
}

interface Curso {
    id: number;
    titulo: string;
    descricao: string;
}

export default function AulaPage() {
    const router = useRouter();
    const { idAula } = router.query;
    const [aula, setAula] = useState<Aula>();

    useEffect(() => {
        getAula();
    }, []);


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
            .eq('idAula', idAula)
            .single();

        if (error) {
            console.log(error);
            return;
        }

        if (data) {
            console.log(data)
            setAula(data);
        }

        console.log(data);
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