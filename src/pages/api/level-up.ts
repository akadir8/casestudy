import type { NextApiRequest, NextApiResponse } from 'next';
import { mockCardProgress, updateCardProgress } from '../../lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { cardId } = req.body;

  if (!cardId || !mockCardProgress[cardId]) {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  const card = mockCardProgress[cardId];

  if (card.progress < 100) {
    return res.status(400).json({ message: 'Card is not ready to level up' });
  }

  const newLevel = card.level + 1;
  updateCardProgress(cardId, { progress: 0, level: newLevel });

  res.status(200).json({ progress: 0, level: newLevel, levelUp: true });
}
