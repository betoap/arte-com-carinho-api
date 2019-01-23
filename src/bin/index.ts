import { Server } from '../server';
import { onError, onListening, Proxy } from '../utils';
import { MongodbFactory } from '../infra';

class ServerWeb {

    // Server
    private _server: Server;
    
    // Configure
    private _config:any = require('./../config/.config');
    
    constructor() {
        this.startServer();
    }
    
    private startServer(): any {
        try {
            this._server = new Server( );
            this.debugger();
        } catch ( error ) {
            console.log( 'Error: ', error );
        }
        const start = this._server.bootstrap();
        this.startMongoDB();
        return start;
    }
    
    private debugger() {
        if ( this._config.debug ) {
            this._server.getServer().on('error', onError( this._server.getServer() ) );
            this._server.getServer().on('listening', onListening( this._server.getServer() ) );
        }
    }

    private startMongoDB() {
        MongodbFactory.getConnection();
    }

    private handleError( error ): void {
        console.log( `Server failed to start` );
        console.error( error );
        process.exit( 1 );
    }
}
new ServerWeb();