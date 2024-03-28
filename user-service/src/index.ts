import express, {Request, Response} from "express";
import variables from "./configs/constants.config";
import { DBConfig } from "./configs/db.config";

class Server {
    private app: express.Application

    constructor() {
        this.app = express()
        this.configuration()
        this.routes()

    }

    public configuration() {
        this.app.set('port', variables.PORT || 3001)
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
    }

    public async routes() {
        // testing route 
        this.app.get( "/", (req: Request, res: Response ) => {
            res.send( "Hello world!" );
        });

        // this.app.use(`/api/auth/`,this.postController.router);
    }

    public async start() {
        try {
            await DBConfig.initialize(); 
            console.log("Database connected successfully 🪐")
            this.app.listen(this.app.get('port'), () => {
                console.log(`App is live on port ${this.app.get('port')} 🚀🚀🚀`);
            });
        } catch (error) {
            console.error("Error starting the server:", error);
        }
    }
}

const server = new Server()

server.start()