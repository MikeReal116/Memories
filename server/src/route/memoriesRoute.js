import express from 'express';

import {
  deleteMemory,
  getMemory,
  postMemory,
  updateMemory,
  likeMemory
} from '../controllers/memoriesController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, postMemory);
router.get('/', getMemory);
router.patch('/:id', auth, updateMemory);
router.delete('/:id', auth, deleteMemory);
router.patch('/:id/like_memory', auth, likeMemory);

export default router;
