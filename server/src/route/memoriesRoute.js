import express from 'express';

import {
  deleteMemory,
  getMemory,
  postMemory,
  updateMemory
} from '../controllers/memoriesController.js';

const router = express.Router();

router.post('/', postMemory);
router.get('/', getMemory);
router.patch('/:id', updateMemory);
router.delete('/:id', deleteMemory);

export default router;
