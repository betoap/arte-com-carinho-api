import { ObjectId } from 'mongoose';
import { DocumentBase } from './../../../core/document/index';

export interface IPedido {
    //TODO add properties
}

class PedidoDocument extends DocumentBase {
    
    constructor() {
        super('pedido');
        this.schema = this.getSchema();
    }

    setData( data ) {
        //TODO schema
    }

    getSchema() {
        return { };
    }
}

export class Pedido extends PedidoDocument implements IPedido {
    
    constructor() {
        super();
    }

    public setData( pedido: IPedido ) {
        //TODO implements properties
        return this;
   }

 }
