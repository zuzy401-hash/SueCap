
import { AnimationStyle, Plan, CreatorTemplate, UserChallenge } from './types';

export const ANIMATION_STYLES: AnimationStyle[] = [
  { id: 'clay', name: 'Arcilla', description: 'Efecto Stop-motion de plastilina', icon: 'fa-cube', promptModifier: 'claymation style, handcrafted plasticine, stop motion aesthetic, vibrant colors' },
  { id: 'wool', name: 'Lana/Fieltro', description: 'Texturas suaves y tejidas', icon: 'fa-cloud', promptModifier: 'needle felted wool style, soft textile texture, handmade fiber art, cozy aesthetic' },
  { id: 'comic', name: 'Cómic/Anime', description: 'Estilo ilustrado vibrante', icon: 'fa-book-open', promptModifier: 'high-quality comic book art, cel-shaded, vibrant ink strokes, dynamic composition' },
  { id: 'vr', name: 'Realidad Virtual', description: 'Inmersivo y futurista', icon: 'fa-vr-cardboard', promptModifier: 'VR 360 cinematic style, immersive digital world, neon accents, hyper-realistic sci-fi' },
  { id: 'avatar', name: 'Avatar 3D', description: 'Personajes estilizados', icon: 'fa-user-astronaut', promptModifier: '3D stylized character render, Pixar style lighting, highly detailed avatar' }
];

export const PRICING_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Gratis',
    price: '$0',
    features: ['5 Imágenes/mes', '1 Video/mes', 'Marca de agua', 'Baja prioridad'],
    color: 'border-slate-500'
  },
  {
    id: 'basic',
    name: 'Básico',
    price: '$12',
    features: ['50 Imágenes/mes', '10 Videos/mes', 'Sin marca de agua', 'Soporte estándar'],
    color: 'border-blue-500'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    features: ['Ilimitadas Imágenes', '50 Videos/mes', 'Acceso a Gemini 3 Pro', 'Soporte VIP', 'Exportación 4K'],
    recommended: true,
    color: 'border-purple-500'
  },
  {
    id: 'unlimited',
    name: 'Edición Ilimitada',
    price: '$59',
    features: ['Todo Ilimitado', 'Acceso anticipado Veo 3.1', 'Consultoría AI 1:1', 'API Dedicada', 'Licencia Comercial Full'],
    color: 'border-amber-500'
  }
];

export const MOCK_TEMPLATES: CreatorTemplate[] = [
  { id: '1', author: 'Dreamer99', title: 'Cyberpunk Clay', previewUrl: 'https://picsum.photos/400/300?random=1', type: 'image', tags: ['clay', 'neon'] },
  { id: '2', author: 'WoolyArt', title: 'Woolen Forest', previewUrl: 'https://picsum.photos/400/300?random=2', type: 'video', tags: ['wool', 'nature'] },
  { id: '3', author: 'ComicMaster', title: 'Samurai Soul', previewUrl: 'https://picsum.photos/400/300?random=3', type: 'image', tags: ['comic', 'action'] },
  { id: '4', author: 'AvatarGen', title: 'Explorer 01', previewUrl: 'https://picsum.photos/400/300?random=4', type: 'video', tags: ['avatar', 'scifi'] }
];

export const DAILY_CHALLENGES: UserChallenge[] = [
  {
    id: 'c1',
    title: 'Primer Sueño',
    description: 'Genera tu primera imagen con el estilo Arcilla',
    rewardXP: 100,
    completed: false,
    icon: 'fa-sparkles'
  },
  {
    id: 'c2',
    title: 'Director de Cine',
    description: 'Crea un video de más de 5 segundos',
    rewardXP: 250,
    completed: false,
    icon: 'fa-film'
  },
  {
    id: 'c3',
    title: 'Crítico de Arte',
    description: 'Dale me gusta a 5 plantillas de la comunidad',
    rewardXP: 50,
    completed: false,
    icon: 'fa-heart'
  },
  {
    id: 'c4',
    title: 'Avatar Maestro',
    description: 'Configura tu perfil con un avatar generado por IA',
    rewardXP: 150,
    completed: false,
    icon: 'fa-user-astronaut'
  }
];
