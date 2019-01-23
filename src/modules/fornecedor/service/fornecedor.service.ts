import { Service } from "./../../../core/service";
import { FornecedorFilter } from './../filter/fornecedor.filter';
import { Fornecedor, IFornecedor } from './../document/Fornecedor.document';

export class FornecedorService extends Service {
    
    public document: IFornecedor = new Fornecedor;

    constructor() {
        super( new FornecedorFilter );
    }

}