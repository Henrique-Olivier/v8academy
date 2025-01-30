export interface Modules {
    idModulo: number,
    modulo: string,
    aulas: ILessons[]
}

export interface CountModulesAndLessons {
    modulos: number,
    aulas: number
}

export interface ILessons {
    idAula: number,
    titulo: string,
    idModulo: number,
    modulo: string,
}

export interface IGroupLessons {
    [moduloTitulo: string]: ILessons[];
}

export interface ModuloComAulas {
    modulo: string;
    aulas: ILessons[];
}