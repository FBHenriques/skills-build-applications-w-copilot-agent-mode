import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'username fullName'));
});

export default router;