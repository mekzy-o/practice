import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
// import fs from 'fs';
import path from 'path';
import router from './routes';





const app = express();

// Activating morgan

app.use(logger('dev'));
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.resolve(__dirname, '../client')));
app.use(cors());
app.use(router);


// app.get('/', (req, res) => res.sendFile('../client/index.html'));
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to API of Politico' });
  });

// invalid route
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Endpoint does not Exist!',
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is live on PORT: ${port}`);
});

export default app;
