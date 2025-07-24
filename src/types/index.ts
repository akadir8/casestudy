export interface Card {
  id: string;
  name: string;
  image: string;
  level: number;
  progress: number;
  description: string;
}

export interface Player {
  energy: number;
  cards: Card[];
}
