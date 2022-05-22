import express from 'express';
import { seguidoresRouter } from './routes/seguidores.route';

const port = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? 3041 : 3040);

const app = express();

app.use(express.json());

app.use( "/seguidores", seguidoresRouter);

app.listen(port);