import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/service/supabase';
import Layout from '../../components/Layout';
import { ButtonDiv, Comment, CommentContainer, CommentHeader, CommentText, ContainerContent, EmptyMessage, ForumContainer, ForumHeader, Header, LineComements } from '../../components/player/style';
import { Button, Form, Placeholder, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import AvatarIcon from '../../assets/avatar.png';


const VideoFrame = styled.div`
  width: 100%;
  background-color: #3A3A3A;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Iframe = styled.iframe`
  height: 100%;   
  width: 75%;
`;

interface IComment {
    idComentário: number;
    descricao: string;
    fkAula: number;
    userId: string;
    userName: string;
}

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
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState<IComment[]>([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        if (idAula) {
            getAula();
            getComments();
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


    async function postComment() {
      
        if( comment === "") {
            return 
        }

        setIsButtonDisabled(true);
        const userObject = localStorage.getItem("sb-bfogzwmikqkepnhxrjyt-auth-token");
        if (userObject) {
            const parsedUserObject = JSON.parse(userObject)
            const userId = parsedUserObject.user.id

            const { data: dataName, error: ErrorName } = await supabase
                .from('usuario')
                .select('nome').
                eq('id', userId);

            if (ErrorName) {
                console.log(ErrorName);
                return
            }

            if (dataName) {

                const { data, error } = await supabase
                    .from('comentario')
                    .insert({
                        descricao: comment,
                        fkAula: idAula,
                        userId,
                        userName: dataName[0].nome
                    })
                    .select('*');


                if (error) {
                    console.log(error);
                    return;
                }

                console.log(data);
                setTimeout(() => {
                    setComment("")
                    setIsButtonDisabled(false);
                    getComments();
                }, 1500);
            }
        }
    }

    async function getComments() {
      
        const { data, error } = await supabase
            .from('comentario')
            .select('*')
            .eq('fkAula', idAula);

        if (error) {
            console.log(error);
            return;
        }

        if (data) {
            console.log(data);
            setCommentList(data);
        }

    }

    function showComments(commentList: IComment[]) {
        return commentList.map((comment, index) => (
            <Comment key={index}>
                <CommentHeader>
                    <Image src={AvatarIcon} alt="Avatar" width={30} />
                    <h1>{comment.userName}</h1>
                </CommentHeader>
                <p>{comment.descricao}</p>
            </Comment>

        ));
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
                    <ForumHeader>
                        Forúm da aula:
                    </ForumHeader>
                    <Button className='px-5 py-2' variant="primary">
                        Próxima aula
                    </Button>
                </ButtonDiv>
                <ForumContainer>
                    <CommentContainer>
                        <CommentText>
                            <Image src={AvatarIcon} alt="Avatar" />
                            <Form.Control value={comment} onChange={e => setComment(e.target.value)} as="textarea" rows={4} />
                        </CommentText>
                        <Button onClick={postComment} disabled={isButtonDisabled} className='px-5 py-2' variant="primary">
                            Publicar
                        </Button>
                    </CommentContainer>
                    <LineComements></LineComements>

                    {commentList?.length > 0 ? showComments(commentList) : <EmptyMessage>Ainda não há comentários nesta aula.</EmptyMessage>}
                </ForumContainer>

            </ContainerContent>
        </Layout>
    );
}