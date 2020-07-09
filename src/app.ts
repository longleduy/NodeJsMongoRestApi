import express,{Request,Response} from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import TopVideoController from "./controllers/videos/TopVideo.controller";
import CommonController from "./controllers/Common.controller";
import EpisodeController from './controllers/Episode.controller';
import MovieController from './controllers/Movie.controller';
import TagController from './controllers/Tag.controller';
import {IRouteDefinition} from "./configs/definitions/Route.definition";
import JsonRespone from './models/Respone.model';
import {Mongo} from './configs/mongo.config';
import dotenv from 'dotenv';
dotenv.config();
class App {
    public app: express.Application;
    public mongo: Mongo = new Mongo();
    constructor() {
        this.app = express();
        this.config();
        this.initRoutes();
        this.mongo.connect();
    }
    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(cors());
    }
    private initRoutes(): void{
        const listController:any = [TopVideoController,CommonController,EpisodeController,MovieController,TagController];
        listController.forEach((controller:any) => {
            const instance = new controller();
            const prefix = Reflect.getMetadata('prefix', controller);
            const routes: IRouteDefinition[] = Reflect.getMetadata('routes', controller);
            routes.forEach((route) => {
               this.app[route.requestMethod](prefix + route.path, async (req: Request, res: Response) => {
                   console.log(req.originalUrl);
                  const data:JsonRespone = await instance[route.methodName](req, res);
                  res.status(data.getStatusCode());
                  res.json(data.getData());
                });
            });
        });
    }
}
export default new App().app;