import db from '../model/db';
import {
  getOffice,
  getCandidates,
} from '../model/voterQuery';
import Authenticator from '../middlewares/authorization';



class VoterController {

  static async voteCandidates(req, res) {

    try {
      const { candidates } = req.body;
      const checkCandidate = await db.query('SELECT * FROM candidates where id = $1', [candidates]);
      if (checkCandidate.rowCount < 1) {
        return res.status(404).send({
          status: 404,
          error: 'Candidate does not exist',
        });
      }

      const { officeid } = checkCandidate.rows[0];
      const now = new Date();

      const values = [now, req.user.id, officeid, candidates];

      const result = await db.query(`INSERT INTO votes (createdOn, createdBy, officeid, candidateid) 
            VALUES ($1, $2, $3, $4) RETURNING *`, values);

      return res.status(201).send({
        status: 201,
        data: [{
          office: result.rows[0].officeid,
          candidate: result.rows[0].candidateid,
          voter: result.rows[0].createdBy,
        }],
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: error.message,
      });
    }


  }

  static async resultCandidates(req, res) {
    try {

      const officeId  = parseInt(req.params.id, 10);
      const value = [officeId];
      const result = await db.query('SELECT officeid, candidateid, COUNT(candidateid) AS results FROM votes WHERE officeid=$1 GROUP BY candidateid, officeid', value);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'no result for this office yet',
        });
      }
      return res.status(201).json({
        status: 201,
        data: result.rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }


}


export default VoterController;
