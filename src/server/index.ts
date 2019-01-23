import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from "cors";
import * as glob from "glob";
import { Request, Response, ErrorRequestHandler } from 'express';
import { normalizePort, Proxy } from '../utils';

export class Server {
    
    // Create a new express application instance
    private _application: express.Application;

    // Instance http
    private _server:http.Server;

    //Configure
    private _config:any = require('./../config/.config');

    //Configure JWT
    private _jwt:any = require('./../config/.jwt');

    // The port the express app will listen on
    private _port: string | number | boolean;

    //Glob
    private _glob: any;

    constructor() {
        this._glob = glob.Glob;
        this._application = express();
        this._server = http.createServer( this._application );
        this.config();
        this.configJwt();
        this.middleware();
    }

    private configCors() {
        return {
            origin: '*',
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "x-access-token"],
            credentials: true,
            preflightContinue: false
        }
    }

    private config(): void {
        this._port = normalizePort( process.env.PORT || 4100 );
        this._application.disable('x-powered-by');
    }

    private configJwt(): void {
        if( this._jwt.active ) {
            const jwt = require(`./../core/service/jwt.service.js`);
            return new jwt.Authentication(this._application).validToken();
        }
    }

    public getServer (): http.Server {
        return this._server;
    }

    private handleRoutes( resolve, reject ) {
        try {
            this.getServer().listen( this._port, Proxy.create( this, this.handleListen, resolve ) );
            resolve( this.getServer() );
        } catch ( error ) {
            return reject( error );
        }
    }

    private handleListen ( resolve ) {
        return resolve( this.getServer() );
    }

    private middleware(): void {
        this._application.use( ( req: Request, res: Response, next: Function ) => {
            // global['region'] = req.originalUrl.substring(1, 3).toUpperCase();
            const region = req.query.region || 'SP';
            global['region'] = region.toUpperCase();
            next();
        });
        this._application.use( cors( this.configCors() ) );
        this._application.use( bodyParser.urlencoded( { extended: false } ) );
        this._application.use( bodyParser.json() );
    }

    public bootstrap(): Promise<any> {
        this.routes();
        this.LoadModules();
        return new Promise( Proxy.create( this, this.handleRoutes ) );
    }

    private routes(): void {
        this._application.route("/").get( (req: Request, res: Response, next:Function) =>
            // res.status(200).json( req.originalUrl.substring(1, 3).toUpperCase() )
            res.status(200).json( {"message": "WELCOME API EDP"} )
        );
    }

    private LoadModules(): void {
        const pattern = "{./build/modules/**/route/index.js,./build/modules/**/route/*.route.js,./build/modules/**/route/*.routes.js}";
        const options = {dot:true, mark: true, ignore:["./build/modules/core/route/*.routes.js"] };
        const self = this;
        this._glob(pattern, options, function (erro, archives) {
            if(!erro) {
                archives.forEach(function (archive) {
                    let name = archive.replace( './build/modules/', '' );
                    name = ( name.split( '/route/' )[0] ).toLowerCase();
                    if( name == "/core") return;
                    const module = require( `../../${archive}` );
                    self._application.use(`/${name}`, module);
                });
            };
            self.setErros();
        });
    }

    private setErros(): void {
        this._application.use( ( req:Request, res:Response, next:Function ) => {
            res.status(404).json({
                "error": {
                    "standard": {
                        "faultText": "Erro interno do servidor.",
                        "faultDetail": [
                            {
                                "text": "Pagina não encontrada.",
                                "id": "HTTP_ERROR_404"
                            }
                        ]
                    }
                }
            });
            next();
        });
        this._application.use( (err: ErrorRequestHandler, req:Request, res:Response, next:Function) => {
            if( process.env.NODE_ENV === "production" ) {
                res.status(500).json({
                    "error": {
                        "standard": {
                            "faultText": "Erro interno do servidor.",
                            "faultDetail": [
                                {
                                    "text": "Ocorreu um erro, nosso time ja esta trabalhando para corrigi-lo!",
                                    "id": "HTTP_ERROR_500"
                                }
                            ]
                        }
                    }
                });
                next(err);
            } else {
                next(err);
            }
        });
    }
}

