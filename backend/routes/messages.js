const express = require('express');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

const router = express.Router();

// POST /api/messages (public - contact form submission)
router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }
    const saved = await Message.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully', data: saved });
  } catch (err) {
    next(err);
  }
});

// GET /api/messages (admin only)
router.get('/', protect, async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/messages/:id/read (admin only)
router.patch('/:id/read', protect, async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json(msg);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/messages/:id (admin only)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
