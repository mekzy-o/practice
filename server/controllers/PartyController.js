import db from '../model/db';
import {
  getParty,
  createParty,
  party,
  updatePartyName,
  deleteParty,
} from '../model/partyQuery';

class PartyController {

  static async createParty(req, res) {
    try {
      const { name, hqAddress, logoUrl } = req.body;
      const values = [name, hqAddress, logoUrl];
      const { rows } = await db.query(createParty, values);
      if (rows) {
        return res.status(201).json({
          status: 201,
          data: rows,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  static async getAllParties(req, res) {
    try {
      const result = await db.query(getParty);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'no party has been created',
        });
      }
      return res.status(200).json({
        status: 200,
        data: result.rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async getParty(req, res) {
    try {
      const { id } = req.params;
      const { rows }= await db.query(party, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'party not found',
        });
      }
      console.log(rows[0]);
      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async deleteParty(req, res) {

    const partyId = parseInt(req.params.id, 10);
    try {
      const { rows } = await db.query(deleteParty, [partyId]);
      if (rows) {
        return res.status(200).json({
          status: 200,
          message: 'Party has been deleted successfully',
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Party with that id not found',
      });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }

  }
}


export default PartyController;


