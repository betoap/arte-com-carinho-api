import { DocumentBase, IBase } from './../../../core/document/index';

export interface IFornecedor extends IBase {
    nome: string;
    telefones?: Array<string>;
    emails?: Array<string>;
    site?: string;
}

class FornecedorDocument extends DocumentBase {
    
    constructor() {
        super('fornecedor');
        this.schema = this.getSchema();
    }

    setData( data ) { }

    // fornecedor
    getSchema() {
        return {
            nome: {
                type: String,
                required: true
            },
            telefones: [{
                type: String,
            }],
            emails: [{
                type: String
            }],
            site: {
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

export class Fornecedor extends FornecedorDocument implements IFornecedor {
    
    public nome: string;
    public telefones?: Array<string>;
    public emails?: Array<string>;
    public site?: string;

    constructor() {
        super();
    }

    public setData( fornecedor: IFornecedor ) {
        this.nome =  fornecedor.nome;
        if ( fornecedor.telefones ) this.telefones = fornecedor.telefones;
        if ( fornecedor.emails ) this.emails = fornecedor.emails;
        if ( fornecedor.site ) this.site = fornecedor.site;
        if ( fornecedor.alterado_em ) this.alterado_em = fornecedor.alterado_em;
        if ( fornecedor.removido_em ) this.removido_em = fornecedor.removido_em;
        return this;
    }

 }
