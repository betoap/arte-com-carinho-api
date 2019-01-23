import { ObjectId } from 'mongoose';
import { DocumentBase } from './../../../core/document/index';

export interface ILancamento {
    //TODO add properties
}

class LancamentoDocument extends DocumentBase {
    
    constructor() {
        super('lancamento');
        this.schema = this.getSchema();
    }

    setData( data ) {
        //TODO schema
    }

    getSchema() {
        return { };
    }
}

export class Lancamento extends LancamentoDocument implements ILancamento {
    
    constructor() {
        super();
    }

    public setData( lancamento: ILancamento ) {
        //TODO implements properties
        return this;
   }

 }
