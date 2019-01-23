import { ObjectId } from 'mongoose';
import { DocumentBase } from './../../../core/document/index';

export interface IOrcamento {
    //TODO add properties
}

class OrcamentoDocument extends DocumentBase {
    
    constructor() {
        super('orcamento');
        this.schema = this.getSchema();
    }

    setData( data ) {
        //TODO schema
    }

    getSchema() {
        return { };
    }
}

export class Orcamento extends OrcamentoDocument implements IOrcamento {
    
    constructor() {
        super();
    }

    public setData( orcamento: IOrcamento ) {
        //TODO implements properties
        return this;
   }

 }
