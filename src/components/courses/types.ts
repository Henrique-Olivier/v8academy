
export interface TrilhaCurso {
  created_at: string;
  curso: {
    descricao: string;
    id: number;
    order: number;
    titulo: string;
  }
  fkCurso: number;
  fkTrilha: number;
}

export interface Trilha {
  descricao: string;
  id: number;
  titulo: string;
}

export interface Curso {
  descricao: string;
  id: number;
  order: number;
  titulo: string;
}
