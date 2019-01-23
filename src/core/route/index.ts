import { Request, Response, Router } from 'express';
import * as HttpStatus from 'http-status';

import { Proxy } from './../../utils';
import { Controller } from '../controller';

export abstract class Route
{
    protected router: Router;
    protected controller: Controller;

    constructor() {
        this.router = Router();
    }

    public routers(): Router {
        
        this.router.get('/:id', Proxy.create(this, this.get));
        this.router.get('/', Proxy.create(this, this.getAll));
        this.router.post('/', Proxy.create(this, this.post));
        this.router.put('/:id', Proxy.create(this, this.put));
        this.router.delete('/:id', Proxy.create(this, this.delete));
        return this.router;
    }

    /**
     * Request MONGODB
     */
    protected get( req: Request, res: Response, next:Function ): void {
        this
            .controller
            .get( req )
            .then( entity => this.response(res, HttpStatus.OK, entity) )
            .catch( error => this.response(res, HttpStatus.NOT_ACCEPTABLE, error) );
    }

    protected getAll( req: Request, res: Response, next:Function ): void {
        this
            .controller
            .getAll( req )
            .then( entity => this.response(res, HttpStatus.OK, entity) )
            .catch( error => this.response(res, HttpStatus.NOT_ACCEPTABLE, error) );
    }

    protected post( req: Request, res: Response, next:Function ): void {
        this
            .controller
            .post( req )
            .then( entity => this.response(res, HttpStatus.CREATED, entity) )
            .catch( error => this.response(res, HttpStatus.UNPROCESSABLE_ENTITY, error) );
    }

    protected put( req: Request, res: Response, next:Function ): void {
        this
            .controller
            .put( req )
            .then( entity => this.response(res, HttpStatus.OK, entity) )
            .catch( error => this.response(res, HttpStatus.UNPROCESSABLE_ENTITY, error) );
    }

    protected delete( req: Request, res: Response, next:Function ): void {
        this
            .controller
            .delete( req )
            .then( entity => this.response(res, HttpStatus.OK, entity) )
            .catch( error => this.response(res, HttpStatus.UNPROCESSABLE_ENTITY, error) );
    }

    protected response(res: Response, status:any, data:any) {
        if( status >= 200 && status < 300 ) {
            res.set({ token: res['token'] });
            data.token = res["token"];
        }
        status = data.statusCode || status;
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        return res.status(status).json(data);
    }
}
