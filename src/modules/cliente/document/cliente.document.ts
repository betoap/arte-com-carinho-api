import { ObjectId } from 'mongoose';
import { DocumentBase } from './../../../core/document/index';

export interface ICliente {
    //TODO add properties
}

class ClienteDocument extends DocumentBase {
    
    constructor() {
        super('cliente');
        this.schema = this.getSchema();
    }

    setData( data ) {
        //TODO schema
    }

    getSchema() {
        return { };
    }
}

export class Cliente extends ClienteDocument implements ICliente {
    
    constructor() {
        super();
    }

    public setData( cliente: ICliente ) {
        //TODO implements properties
        return this;
   }

 }
