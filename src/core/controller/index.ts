import { Request } from "express";
import { Service } from "../service";

export abstract class Controller {
    
    protected service: Service;

    constructor( ) { }

    /**
     * MongoDB
    */
    get( req?: any ) {
        return this
            .service
            .find( req );
    }
    
    getAll( req?: Request ) {
        return this
            .service
            .find( req );
    }

    post(req: Request) {
        return this
            .service
            .post( req );
    }

    put(req: Request) {
        return this
            .service
            .put( req );
    }

    delete(req: Request) {
        return this
            .service
            .delete( req );
    }
}
