import express from 'express';
import { PORT } from './config.js';
import RouterAuth from './routes/auth.routes.js';

const app = express();

app.set('view engine', 'ejs'); // Tipo de plantilla html a renderizar, * ejs *
app.use(express.json());

app.use('/', RouterAuth);
app.use('/', (req, res) => {
  res.render('index.ejs', { username: 'gus' });
});

app.listen(PORT, () => {
  console.log('Conexion Server... ');
});
