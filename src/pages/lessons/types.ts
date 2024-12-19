export interface ILessons {
    idAula: number,
    titulo: string,
    modulo: string,
}

export interface IGroupLessons {
    [moduloTitulo: string]: ILessons[];
}

export interface ModuloComAulas {
    modulo: string;
    aulas: ILessons[];
}