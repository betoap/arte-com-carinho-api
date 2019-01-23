import { ObjectId } from 'mongoose';
import { DocumentBase } from './../../../core/document/index';

export interface IConfig {
    //TODO add properties
}

class ConfigDocument extends DocumentBase {
    
    constructor() {
        super('config');
        this.schema = this.getSchema();
    }

    setData( data ) {
        //TODO schema
    }

    getSchema() {
        return { };
    }
}

export class Config extends ConfigDocument implements IConfig {
    
    constructor() {
        super();
    }

    public setData( config: IConfig ) {
        //TODO implements properties
        return this;
   }

 }
