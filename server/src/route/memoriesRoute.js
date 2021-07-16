import express from 'express';

import {
  deleteMemory,
  getMemory,
  postMemory,
  updateMemory,
  likeMemory,
  getMemoryBySearch,
  getMemoryById
} from '../controllers/memoriesController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, postMemory);
router.get('/', getMemory);
router.get('/search', getMemoryBySearch);
router.get('/:id', getMemoryById);
router.patch('/:id', auth, updateMemory);
router.delete('/:id', auth, deleteMemory);
router.patch('/:id/like_memory', auth, likeMemory);

export default router;
