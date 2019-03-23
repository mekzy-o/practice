import express from 'express';
import PartyController from '../controllers/PartyController';
import validate from '../middlewares/validateParty';

const expressValidator = require('express-validator');

const router = express.Router();

router.use(expressValidator());

// Default route for API
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to API of Politico' });
});

// Router for getting all parties
router.get('/api/v1/parties', PartyController.getAllParties);

// Router for getting single party
router.get('/api/v1/parties/:id', validate.id, PartyController.getParty);

// Router for creating party
router.post('/api/v1/parties', validate.input, PartyController.createParty);

// Router for deleting party
router.delete('/api/v1/parties/:id', PartyController.deleteParty);

// Router for deleting party
router.patch('/api/v1/parties/:id', validate.id, PartyController.updatePartyName);

export default router;
