import { Service } from "./../../../core/service";
import { ProdutoFilter } from './../filter/produto.filter';
import { Produto, IProduto } from './../document/Produto.document';

export class ProdutoService extends Service {
    
    public document: IProduto = new Produto;

    constructor() {
        super( new ProdutoFilter );
    }

}