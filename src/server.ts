import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import * as http from 'http';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import buyerRoutes from './routes/buyer.routes';
import sellerRoutes from './routes/seller.routes';
import productRoutes from './routes/product.routes';
import materialRoutes from './routes/material.routes';
import sizeRoutes from './routes/size.routes';
import colorRoutes from './routes/color.routes';
import categoryRoutes from './routes/category.routes';
import imageRoutes from './routes/image.routes';
import mpRoutes from './routes/mp.routes';
import addressRoutes from './routes/user-address.routes';
import neighborhoodRoutes from './routes/neighborhood.routes';
import orderRoutes from './routes/order.routes';
import healthRoute from './routes/health.route';
import swaggerUi from 'swagger-ui-express';
import { HttpResponseCodes } from './shared/HttpResponseCodes';
import path from 'path';
import './polyfills';
const swaggerOutput = require('./swagger_output.json'); // eslint-disable-line @typescript-eslint/no-var-requires
export class Server {
  private express: express.Express;
  readonly port: string;
  httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    const router = Router();
    router.use(cors());
    this.express.use(cors());
    router.use(errorHandler());
    this.express.use(healthRoute);
    this.express.use(userRoutes);
    this.express.use(buyerRoutes);
    this.express.use(sellerRoutes);
    this.express.use(productRoutes);
    this.express.use(categoryRoutes);
    this.express.use(materialRoutes);
    this.express.use(sizeRoutes);
    this.express.use(colorRoutes);
    this.express.use(imageRoutes);
    this.express.use(mpRoutes);
    this.express.use(addressRoutes);
    this.express.use(neighborhoodRoutes);
    this.express.use(orderRoutes);
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
    this.express.use(express.static(path.join(__dirname, '../public')));
    this.express.use('/public/images/', express.static(path.join(__dirname, '../public/images/')));
    this.express.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });
    router.use((err: Error, req: Request, res: Response) => {
      console.log(err);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`  Server is running at http://localhost:${this.port} in ${this.express.get('env')} mode`);
        console.log('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }
      return resolve();
    });
  }
}
