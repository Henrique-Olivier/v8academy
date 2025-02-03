import Layout from '../../components/Layout';
import { ButtonDiv,CommentContainer,CommentText, ContainerContent, EmptyMessage, ForumContainer, ForumHeader, Header, Iframe, LineComements, VideoFrame } from '../../components/player/style';
import { Button, Form, Placeholder, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import AvatarIcon from '../../assets/avatar.png';
import usePlayer from '@/components/player/hooks';

export default function AulaPage() {

    const  {
        aula,
        comment,
        commentList,
        isButtonDisabled,
        setComment,
        postComment,
        showComments
    } = usePlayer();

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