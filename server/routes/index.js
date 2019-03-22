import express from 'express';

const router = express.Router();

// Default route for API
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to API of Politico' });
});

export default router;
