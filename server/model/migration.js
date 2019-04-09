import bcryptjs from 'bcryptjs';
import db from './db';

const queryTable = async () => {
  try {
    const dropPartyTable = await db.query('DROP TABLE IF EXISTS parties CASCADE;');
    const dropOfficeTable = await db.query('DROP TABLE IF EXISTS offices CASCADE;');
    const dropUserTable = await db.query('DROP TABLE IF EXISTS users CASCADE;');
    const dropCandidateTable = await db.query('DROP TABLE IF EXISTS candidates CASCADE');
    const dropvoteTable = await db.query('DROP TABLE IF EXISTS votes;');


    const partyTable = await db.query(`CREATE TABLE IF NOT EXISTS parties(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        hqAddress VARCHAR(250) NOT NULL,
        logoUrl VARCHAR(250) NOT NULL,
        createdAt DATE DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATE);`);

    const officeTable = await db.query(`CREATE TABLE IF NOT EXISTS offices(
          id SERIAL UNIQUE PRIMARY KEY,
          type VARCHAR(50) NOT NULL,
          name VARCHAR(50) UNIQUE NOT NULL);`);

    const userTable = await db.query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL UNIQUE PRIMARY KEY,
            firstName VARCHAR(50) NOT NULL,
            lastNAme VARCHAR(50) NOT NULL,
            otherName VARCHAR(50),
            email VARCHAR(50) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phoneNumber VARCHAR(15) NOT NULL,
            passportUrl TEXT DEFAULT 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            isAdmin BOOLEAN DEFAULT FALSE);`);

    const candidateTable = await db.query(`CREATE TABLE IF NOT EXISTS candidates(
              id SERIAL UNIQUE PRIMARY KEY,
              officeId INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE,
              partyId INT NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
              userId INT UNIQUE REFERENCES users(id) ON DELETE CASCADE);`);
  

    const voteTable = await db.query(`CREATE TABLE IF NOT EXISTS votes(
              id SERIAL UNIQUE NOT NULL,
              createdOn DATE DEFAULT CURRENT_TIMESTAMP,
              createdBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              officeId INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE,
              candidateId INT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
              PRIMARY KEY (officeId, createdBy));`);

    const values = ['admin', 'admin', 'admin', 'admin@politico.com', bcryptjs.hashSync('admin', 10), '07036328870', 'true'];
    const admin = await db.query('INSERT into users(firstName, lastName, otherName, email, password, phoneNumber, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', values);
    const insertParty = await db.query('INSERT INTO parties(name, hqAddress, logoUrl) VALUES(\'alligience alliance\',\'aliko dangote street abuja\', \'http://res.cloudinary.com/dghlhphlh/image/upload/v1549455253/dr5ioks01azmjwhd5avw.jpg\' ) ;');
    const insertOffice = await db.query('INSERT INTO offices(type, name) VALUES(\'federal\',\'president\') ;');

    console.log(dropPartyTable, dropUserTable, dropOfficeTable,
      dropCandidateTable, dropvoteTable, partyTable, userTable,
      officeTable, candidateTable, voteTable, admin, insertParty, insertOffice);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.stack);
    return err.stack;
  }
};

queryTable();


