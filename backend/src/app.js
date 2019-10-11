import './bootstrap';

import Youch from 'youch';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import path from 'path';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    const corsOptions = {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
    };

    this.server.use(cors(corsOptions));
    this.server.use(
      '/files/examples',
      express.static(path.resolve(__dirname, '..', 'tmp', 'examples'))
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
