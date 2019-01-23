import { DocumentBase, IBase } from './../../../core/document/index';

export interface IProduto extends IBase{
    nome: string;
    descricao?: string;
}

class ProdutoDocument extends DocumentBase {
    
    constructor() {
        super('produto');
        this.schema = this.getSchema();
    }

    setData( data ) { }

    
    // produto
    getSchema() {
        return {
            nome: {
                type: String,
                required: true
            },
            descricao: {
                type: String
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

export class Produto extends ProdutoDocument implements IProduto {
    
    public nome: string;
    public descricao?: string;

    constructor() {
        super();
    }

    public setData( produto: IProduto ) {
        this.nome = produto.nome;
        if ( produto.descricao ) this.descricao = produto.descricao;
        if ( produto.alterado_em ) this.alterado_em = produto.alterado_em;
        if ( produto.removido_em ) this.removido_em = produto.removido_em;
        return this;
   }

 }
