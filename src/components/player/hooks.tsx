import { supabase } from "@/service/supabase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Aula, IComment } from "./types";
import AvatarIcon from '../../assets/avatar.png';
import { Comment, CommentHeader } from "./style";
import Image from "next/image";

export default function usePlayer() {
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

        if (comment === "") {
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


    return {
        aula,
        comment,
        commentList,
        isButtonDisabled,
        setComment,
        postComment,
        showComments
    };
}