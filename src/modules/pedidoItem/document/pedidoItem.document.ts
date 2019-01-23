import { ObjectId } from 'mongoose';
import { DocumentBase } from './../../../core/document/index';

export interface IPedidoItem {
    //TODO add properties
}

class PedidoItemDocument extends DocumentBase {
    
    constructor() {
        super('pedidoItem');
        this.schema = this.getSchema();
    }

    setData( data ) {
        //TODO schema
    }

    getSchema() {
        return { };
    }
}

export class PedidoItem extends PedidoItemDocument implements IPedidoItem {
    
    constructor() {
        super();
    }

    public setData( pedidoItem: IPedidoItem ) {
        //TODO implements properties
        return this;
   }

 }
