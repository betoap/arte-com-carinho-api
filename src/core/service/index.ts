import { Filter } from '../filter';

export abstract class Service {

    protected document: any;

    constructor( filter?: Filter ) { }
    
    /**
     * MongoDB
    */
    public find( req: any ) {
        return this
            .document
            .find( req );
    }

    public count( req: any ) {
        return this
            .document
            .count( req );
    }

    public post( req: any, document?: any ) {
        document = document || this.document;
        return document
            .setData( req.body )
            .post();
    }

    public put( req: any ) {
        return this
            .document
            .setData( req.body )
            .put( req );
    }

    public delete( req: any ) {
        return this
            .document
            .delete( req );
    }
}
