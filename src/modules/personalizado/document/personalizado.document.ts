import { ObjectId } from 'mongoose';
import { DocumentBase } from './../../../core/document/index';

export interface IPersonalizado {
    //TODO add properties
}

class PersonalizadoDocument extends DocumentBase {
    
    constructor() {
        super('personalizado');
        this.schema = this.getSchema();
    }

    setData( data ) {
        //TODO schema
    }

    getSchema() {
        return { };
    }
}

export class Personalizado extends PersonalizadoDocument implements IPersonalizado {
    
    constructor() {
        super();
    }

    public setData( personalizado: IPersonalizado ) {
        //TODO implements properties
        return this;
   }

 }
