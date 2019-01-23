import { ObjectId } from 'mongoose';
import { DocumentBase, IBase } from './../../../core/document/index';
import { Produto } from '../../produto/document/Produto.document';

export interface IProduto_fornecedor extends IBase {
    produto: any;
    fornecedor: any;
    preco: string;
}

class Produto_fornecedorDocument extends DocumentBase {
    
    constructor() {
        super('produto_fornecedor');
        this.populate = ['Produto', 'Fornecedor'];
        this.schema = this.getSchema();
    }

    setData( data ) { }

    getSchema() {
        return {
            produto: {
                type: ObjectId,
                ref: 'Produto',
                required: true
            },
            fornecedor: {
                type: ObjectId,
                ref: 'Fornecedor',
                required: true
            },
            preco: {
                type: Number,
                required: true
            }
        };
    }
}

export class Produto_fornecedor extends Produto_fornecedorDocument implements IProduto_fornecedor {
    
    public produto: any;
    public fornecedor: any;
    public preco: string;

    constructor() {
        super();
    }

    public setData( produto_fornecedor: IProduto_fornecedor ) {
        this.produto = produto_fornecedor.produto;
        this.fornecedor = produto_fornecedor.fornecedor;
        this.preco = produto_fornecedor.preco;
        if ( produto_fornecedor.alterado_em ) this.alterado_em = produto_fornecedor.alterado_em;
        if ( produto_fornecedor.removido_em ) this.removido_em = produto_fornecedor.removido_em;
        return this;
   }

 }
