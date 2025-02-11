
import { createContext, useContext, useState } from "react";


interface ModalContextProps {
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    order: number;
    setOrder: (value: number) => void;
}

// Criando o contexto
const ModalContext = createContext<ModalContextProps>({
  title: "",
  setTitle: () => {},
  description: "",
  setDescription: () => {},
  order: 0,
  setOrder: () => {}
});

export const ModalProvider = ({ children } : {children: React.ReactNode}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);

  
  return (
    <ModalContext.Provider value={{ title, setTitle, description, setDescription, order, setOrder }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useModalContext = () => {
  return useContext(ModalContext);
};
