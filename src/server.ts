import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import * as http from 'http';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
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
import { HttpResponseCodes } from './shared/HttpResponseCodes';
import path from 'path';
import './polyfills';
import fs from 'fs';

function printFileTree(dir: string, prefix: string = ''): void {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    if (file === 'node_modules') {
      return; // Skip the 'node_modules' directory
    }

    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      console.log(`${prefix}├── ${file}/`);
      printFileTree(filePath, `${prefix}│   `);
    } else {
      console.log(`${prefix}├── ${file}`);
    }
  });
}

printFileTree('./');

export class Server {
  private express: express.Express;
  readonly port: string;
  httpServer?: http.Server;
  private staticPath: string = '../client/dist';
  private basePath: string = __dirname;

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
    this.express.use(adminRoutes);
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

    this.express.use(express.static(path.join(this.basePath, '/assets', this.staticPath)));
    this.express.use('/public/images/', express.static(path.join(this.basePath, '/public/images/')));
    this.express.get('*', (req, res) => {
      try {
        // Read index.html file synchronously
        const data = fs.readFileSync(path.join(this.basePath, this.staticPath, 'index.html'), 'utf8');
        // Send the contents of index.html as the response
        res.send(data);
      } catch (err) {
        console.error('Error reading index.html:', err);
        res.status(500).send('Internal Server Error');
      }
    });
    /*     this.express.get('*', (req, res) => {
      res.redirect('/');
    }); */
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
