import express from 'express';
import cors from 'cors';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
import { pokemon } from './pokemon';
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'Hello aldis API' });
});

app.get('/pokemon', (req, res) => {
  res.send(pokemon);
});

app.get('/search', (req, res) => {
  const q = ((req.query?.q as string) ?? '').toLowerCase();
  res.send(
    pokemon.filter(({ name: { english } }) => english.toLowerCase().includes(q))
  );
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
