export interface IComment {
    idComentário: number;
    descricao: string;
    fkAula: number;
    userId: string;
    userName: string;
}

export interface Aula {
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