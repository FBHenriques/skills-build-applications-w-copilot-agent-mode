import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'username fullName').sort({ rank: 1 }));
});

export default router;