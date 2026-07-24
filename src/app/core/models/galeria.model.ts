export interface Galeria {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  imagenUrl: string;
  fecha: string;
  lugar: string;
  likes: number;
  liked?: boolean;
}
