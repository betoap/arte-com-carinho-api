import { Service } from "./../../../core/service";
import { OrcamentoFilter } from './../filter/orcamento.filter';
import { Orcamento, IOrcamento } from './../document/Orcamento.document';

export class OrcamentoService extends Service {
    
    public document: IOrcamento = new Orcamento;

    constructor() {
        super( new OrcamentoFilter );
    }

}