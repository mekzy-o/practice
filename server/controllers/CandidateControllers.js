import db from '../model/db';
import { newCandidate, candidates } from '../model/candidateQuery.js';

class CandidateController {

  static async registerCandidate(req, res) {
    try {
      const userId = parseInt(req.params.id, 10);
      const { officeId, partyId } = req.body;
      const values = [officeId, partyId, userId];
      const checkOffice = await db.query('SELECT * FROM offices WHERE id = $1', [officeId]);
      if (checkOffice.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'office does not exist!',
        });

      }
      const checkParty = await db.query('SELECT * FROM parties WHERE id = $1', [partyId]);
      if (checkParty.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'party does not exist!',
        });

      }

      const checkUser = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
      if (checkUser.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'user does not exist!',
        });
      }
      const userExists = await db.query(candidates, [userId]);
      if (userExists.rowCount >= 1) {
        return res.status(409).json({
          status: 409,
          error: 'You have already applied for a political office!',
        });
      }

      const { rows } = await db.query(newCandidate, values);
      console.log(rows);
      return res.status(201).json({
        status: 201,
        data: {
          office: rows[0].officeid,
          party: rows[0].partyid,
          user: rows[0].userid,
        },
      });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,

      });
    }
  }
}


export default CandidateController;
