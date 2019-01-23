import { Service } from "./../../../core/service";
import { LancamentoFilter } from './../filter/lancamento.filter';
import { Lancamento, ILancamento } from './../document/Lancamento.document';

export class LancamentoService extends Service {
    
    public document: ILancamento = new Lancamento;

    constructor() {
        super( new LancamentoFilter );
    }

}