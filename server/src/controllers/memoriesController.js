import Memory from '../model/memoriesModel.js';

export const postMemory = async (req, res) => {
  const memory = new Memory({ ...req.body, creatorId: req.userId });

  try {
    await memory.save();
    res.status(201).send(memory);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getMemory = async (req, res) => {
  try {
    const memories = await Memory.find({});
    res.send(memories);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateMemory = async (req, res) => {
  const { id } = req.params;
  try {
    const memory = await Memory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.send(memory);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteMemory = async (req, res) => {
  const { id } = req.params;
  try {
    const memory = await Memory.findByIdAndDelete(id);
    if (!memory) return res.status(404).send('No memory');
    res.send(memory);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const likeMemory = async (req, res) => {
  const { id } = req.params;
  try {
    const memory = await Memory.findById(id);
    if (!memory) return res.status(404).send('Not found');
    if (memory.likes.includes(req.userId)) {
      memory.likes = memory.likes.filter((like) => like !== req.userId);
      await memory.save();
    } else {
      memory.likes.push(req.userId);
      await memory.save();
    }
    res.status(200).send(memory);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
