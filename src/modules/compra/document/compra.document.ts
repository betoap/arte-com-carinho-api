import { ObjectId } from 'mongoose';
import { DocumentBase, IBase } from './../../../core/document/index';

export interface ICompra extends IBase {
    produto: string;
    data_pedido: Date;
    data_entrega: Date;
    quantidade: Number;
}

class CompraDocument extends DocumentBase {
    
    constructor() {
        super('compra');
        this.schema = this.getSchema();
    }

    setData( data ) { }

    // compra
    getSchema() {
        return {
            produto: [{
                type: ObjectId,
                ref: 'Produto',
                required: true
            }],
            data_pedido: {
                type: Date,
                required: true
            },
            data_entrega: {
                type: Date,
                required: true
            },
            quantidade: {
                type: Number
            },
            criado_em: {
                type: Date,
                default: Date.now
            },
            editado_em: {
                type: Date,
                default: null
            },
            removido_em: {
                type: Date,
                default: null
            }
        }
    }

}

export class Compra extends CompraDocument implements ICompra {

    public produto: string;
    public data_pedido: Date;
    public data_entrega: Date;
    public quantidade: Number;
    
    constructor() {
        super();
    }

    public setData( compra: ICompra ) {
        this.produto = compra.produto;
        this.data_pedido = compra.data_pedido;
        this.data_entrega = compra.data_entrega;
        this.quantidade = compra.quantidade;
        if ( compra.alterado_em ) this.alterado_em = compra.alterado_em;
        if ( compra.removido_em ) this.removido_em = compra.removido_em;
        return this;
    }

 }
