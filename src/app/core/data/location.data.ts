import { Location } from '../models/location.model';

export const LocationData: Location[] = [
  {
    id: 1,
    titulo: 'Conversatorio Magdalena',
    descripcion: 'Reunión con vecinos.',
    fecha: '18 Mayo 2024',
    direccion: 'Magdalena',
    imagen: 'assets/images/1.jpg',
    lat: -12.0901,
    lng: -77.0683,
    fotos: 25,
    videos: 4,
    categoria: 'Conversatorio',
  },

  {
    id: 2,
    titulo: 'Parque Castilla',
    descripcion: 'Visita vecinal.',
    fecha: '20 Mayo',
    direccion: 'Pueblo Libre',
    imagen: 'assets/images/2.jpg',
    lat: -12.074,
    lng: -77.065,
    fotos: 13,
    videos: 2,
    categoria: 'Visita',
  },
];
