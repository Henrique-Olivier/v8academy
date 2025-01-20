import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Lesson } from "./types";

export default function useManageModule() {
  const router = useRouter();
  const { createOrEdit } = router.query;

  const [show, setShow] = useState(false);
  const [titleModal, setTitleModal] = useState("Criar Aula");
  const [listLessons, setListLessons] = useState<Lesson[]>([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputTitle, setInputTitle] = useState('');
  const [inputUrl, setInputUrl] = useState('');

  if(!createOrEdit) {
    router.push('/trails');
    return;
  }

  const pathUrl = createOrEdit[0];
  const idModule = createOrEdit[1];

  if(pathUrl === 'create') {

  }

  return {
    createOrEdit,
    lessons: {
      listLessons,
      add: setListLessons,
    },
    modal: {
      titleModal,
      show,
      handleClose,
      handleShow,
      input: {
        title: {
          value: inputTitle,
          update: setInputTitle,
        },
        url: {
          value: inputUrl,
          update: setInputUrl,
        }
      }
    },
  }
}