import { Service } from "./../../../core/service";
import { Produto_fornecedorFilter } from './../filter/produto_fornecedor.filter';
import { Produto_fornecedor, IProduto_fornecedor } from './../document/Produto_fornecedor.document';

export class Produto_fornecedorService extends Service {
    
    public document: IProduto_fornecedor = new Produto_fornecedor;

    constructor() {
        super( new Produto_fornecedorFilter );
    }

}