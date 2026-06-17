export interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
  image: string
  description: string
  capacity: number
  attendees: number
  organizer: string
  organizerImage: string
  price: number
  rating: number
}

export const eventsDatabase: Event[] = [
  {
    id: 1,
    title: 'React Summit 2026',
    date: '15 de Junho de 2026',
    time: '09:00 - 17:00',
    location: 'São Paulo, SP - Centro de Convenções',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    description: `React Summit é o maior evento de React no Brasil!

Junte-se a nós para aprender as melhores práticas de desenvolvimento com React, desde conceitos básicos até técnicas avançadas. Teremos palestras de especialistas da comunidade, workshops práticos e muito networking.

O que você vai aprender:
• Hooks avançados e Custom Hooks
• Performance otimização e memoização
• State management (Context, Redux, Zustand)
• Testing em React (Jest, Testing Library)
• SSR e Next.js
• Deployment e CI/CD

Palestrantes confirmados:
- Maria Silva - React Core Developer
- João Santos - Full Stack Engineer
- Ana Costa - Performance Specialist

Inscreva-se agora e garanta seu lugar!`,
    capacity: 500,
    attendees: 342,
    organizer: 'Tech Community BR',
    organizerImage: 'https://via.placeholder.com/100',
    price: 49.90,
    rating: 4.8
  },
  {
    id: 2,
    title: 'AI & Machine Learning Conference',
    date: '22 de Junho de 2026',
    time: '10:00 - 18:00',
    location: 'Rio de Janeiro, RJ - Auditório Central',
    category: 'IA',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    description: `Conferência especializada em Inteligência Artificial e Machine Learning

Explore o futuro da IA com os maiores especialistas do Brasil e do mundo. Desde modelos clássicos até LLMs e computação quântica, esta conferência cobre tudo.

Agenda:
• IA Generativa e LLMs
• Computer Vision Aplicada
• NLP e Processamento de Linguagem Natural
• MLOps em Produção
• Ética em IA

Workshops incluídos:
- Fine-tuning de modelos GPT
- Implementação de Computer Vision
- Deploy de modelos em produção

Investimento: Imprescindível para quem trabalha com dados e IA!`,
    capacity: 300,
    attendees: 215,
    organizer: 'AI Innovation Lab',
    organizerImage: 'https://via.placeholder.com/100',
    price: 89.90,
    rating: 4.9
  },
  {
    id: 3,
    title: 'DevOps World',
    date: '29 de Junho de 2026',
    time: '08:00 - 16:00',
    location: 'Belo Horizonte, MG - Campus Tech',
    category: 'DevOps',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=450&fit=crop',
    description: `O maior evento de DevOps e Cloud Native do Brasil!

Aprenda as melhores práticas em DevOps, Kubernetes, CI/CD e infraestrutura cloud.

Tópicos principais:
• Kubernetes na produção
• Docker e containerização avançada
• GitHub Actions e CI/CD
• Infrastructure as Code (Terraform, Ansible)
• Observabilidade (Prometheus, Grafana)
• Security em DevOps

Palestrantes:
- Roberto Cloud - AWS DevOps Expert
- Fernanda Ops - Kubernetes Specialist
- Lucas Infra - Infrastructure Architect

500+ participantes esperados!`,
    capacity: 400,
    attendees: 128,
    organizer: 'DevOps Community',
    organizerImage: 'https://via.placeholder.com/100',
    price: 79.90,
    rating: 4.7
  },
  {
    id: 4,
    title: 'Web3 & Blockchain Summit',
    date: '6 de Julho de 2026',
    time: '09:00 - 17:00',
    location: 'Curitiba, PR - Convention Center',
    category: 'Web3',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop',
    description: `Mergulhe no futuro descentralizado com Web3!

Aprenda sobre blockchain, smart contracts, DeFi e o futuro da internet descentralizada.

Conteúdo:
• Fundamentos de Blockchain
• Ethereum e Smart Contracts
• DeFi - Finanças Descentralizadas
• NFTs e Metaverso
• Web3 Developer Tools
• Segurança em Web3

Palestrantes internacionais e nacionais.
Oportunidades de networking com investidores!`,
    capacity: 250,
    attendees: 189,
    organizer: 'Blockchain Alliance',
    organizerImage: 'https://via.placeholder.com/100',
    price: 99.90,
    rating: 4.6
  },
  {
    id: 5,
    title: 'Cloud Architecture Bootcamp',
    date: '13 de Julho de 2026',
    time: '09:00 - 18:00',
    location: 'Salvador, BA - Tech Hub',
    category: 'Cloud',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
    description: `Bootcamp intensivo de arquitetura em cloud!

3 dias de imersão em arquitetura cloud com AWS, Azure e Google Cloud.

Programa:
• Arquitetura de microsserviços
• Escalabilidade e performance
• Disaster recovery
• Cost optimization
• Multi-cloud strategy
• Hands-on labs com serviços reais

Instrutor: Carlos Cloud - Cloud Architect Master
Certificado ao final do curso!`,
    capacity: 100,
    attendees: 87,
    organizer: 'Cloud Masters Academy',
    organizerImage: 'https://via.placeholder.com/100',
    price: 199.90,
    rating: 4.9
  },
  {
    id: 6,
    title: 'Mobile Dev Conference',
    date: '20 de Julho de 2026',
    time: '10:00 - 16:00',
    location: 'Brasília, DF - Tech Park',
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
    description: `Conferência dedicada a desenvolvimento mobile!

Explore React Native, Flutter, Swift, Kotlin e as últimas tendências em desenvolvimento mobile.

Temas:
• React Native e Expo
• Flutter para Web
• Swift para iOS
• Kotlin para Android
• Cross-platform development
• Mobile performance e UX

Case studies de apps com milhões de downloads.
Networking com founders de startups mobile!`,
    capacity: 200,
    attendees: 156,
    organizer: 'Mobile Developers Club',
    organizerImage: 'https://via.placeholder.com/100',
    price: 59.90,
    rating: 4.8
  }
]

export const getEventById = (id: number): Event | undefined => {
  return eventsDatabase.find(event => event.id === Number(id))
}

export const getAllEvents = (): Event[] => {
  return eventsDatabase
}
