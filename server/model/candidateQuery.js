const newCandidate =  'INSERT INTO candidates(officeId, partyId, userId) VALUES($1, $2, $3) RETURNING *';
const candidates = 'SELECT * FROM candidates where userid = $1';


export { newCandidate, candidates };