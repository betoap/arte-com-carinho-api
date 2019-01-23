import mongoose = require('mongoose');
import {Document, Schema, Model } from 'mongoose';

export interface IBase {
    criado_em: Date;
    alterado_em?: Date;
    removido_em?: Date;
}

export abstract class DocumentBase {

    private _modelName:string;
    private _schema:Schema;
    private _model:Model<Document>;
    
    protected populate: Array<string>;

    public criado_em: Date;
    public alterado_em?: Date;
    public removido_em?: Date;

    public constructor( modelName:string ) {
        this._modelName  = modelName;
    };

    abstract setData( data );

    public set schema( schema: any ) {
        this._schema  = new Schema( schema );
        if(!this._model)
            this._model = mongoose.model(this._modelName, this._schema);
    }

    public get schema(){
        return this._schema;
    };

    public get model(){
        return this._model;
    };

    public save( document: any ): Promise<any> {
        return new Promise ( ( resolve, reject ) => {
            document.save( (err:any, data:any) => {
                if( err ) return reject( err );
                return resolve( data );
            });
        } );
    };

    private mountSearch( req, findIsBody: boolean = true ): any {
        let objSearch = this.mountWhere( req.query );
        let objSearchWhere = objSearch.where;
        let objSearchParams = objSearch.params;
        if( findIsBody ) {
            let _objSearch = this.mountWhere( req.body );
            objSearchWhere = { ...objSearchWhere, ..._objSearch.where };
        }
        objSearch = { where: objSearchWhere, params: objSearchParams };
        if ( req && req.params && req.params.id ) {
            objSearch.where['_id'] = req.params.id;
        }
        return objSearch;
    }

    public find( req: any, findIsBody?: boolean ): Promise<any> {
        let objSearch = this.mountSearch( req, findIsBody );
        return new Promise ( ( resolve, reject ) => {
            const request = this
                .model
                .find( objSearch.where, null, objSearch.params);
                if( this.populate ) { request.populate( this.populate ); };
                request.exec(
                    ( err:any, data:any ) => {
                        if( err ) return reject( err );
                        return resolve( data );
                    }
                );
        });
    };

    public count( req: any, findIsBody?: boolean ): Promise<any> {
        let objSearch = this.mountSearch( req, findIsBody );
        return new Promise ( ( resolve, reject ) => {
            this.model.count( objSearch.where, ( err:any, data:any ) => {
                if( err ) return reject( err );
                return resolve( data );
            });
        });
    }

    public post() {
        const document = new this.model( this );
        return this.save( document );
    }

    public put( req: any ){
        return new Promise ( ( resolve, reject ) => {
        this
            .find( req, false )
            .then( data => {
                data.forEach( item => {
                    item.set( this );
                    this.save( item );
                });
                resolve( data );
            })
            .catch( err => reject( err ) );
        }); 
    }

    public delete( objSearch: any ): Promise<any> {
        return new Promise ( ( resolve, reject ) => {
            this
                .find( objSearch )
                .then( data => {
                    data.forEach( item => {
                        item.remove();
                    });
                    resolve( data );
                })
                .catch( err => reject( err ) );
        });
    }

    private mountWhere( data ) {
        const where = {};
        const params = {};
        for (let element in data) {
            const value = this.checkRegex(data[element]);
            if( element === 'skip' || element === 'limit') { 
                params[element] = parseInt( data[element] );
                continue;
            }
            if( element === 'sort' ) {
                params['sort'] = this.orderBy( data[element] );
                continue;
            }
            where[element] = value;
        };
        return { where, params };
    }

    private orderBy( data ) {
        const fields = data.split( '|' );
        const fieldOrder = {};
        fields.forEach( element => {
            const _data = element.split( ',' );
            const field = _data[0];
            const order = _data[1] || 1;
            fieldOrder[field] = parseInt( order );
        });
        return fieldOrder;
    }

    private relationship( data ) {
        this.populate.forEach( ( element: any ) => {
            const key = element.toLowerCase();
            if( this.hasOwnProperty( key ) ) {
                // console.log( this[key], key, element );
                // const relationship = <typeof DocumentBase>new global[element]();
                console.log( global['fornecedor'] )
                // relationship['setData']( this[key] );
                // relationship['save']();
            };
        });
    }

    private checkRegex( str ): string {
        str = decodeURI( str );
        if ( this.isNumeric( str ) ) {
            str = parseInt( str );
        }
        if( !this.isNumeric( str ) && str.includes( '\\' ) ) {
            str = str.split( '\\' ).join( '' );
            str = new RegExp( str, 'gi' );
        }
        return str;
    }

    isNumeric( n ) {
        return !isNaN( parseFloat( n ) ) && isFinite( n );
    }
};
