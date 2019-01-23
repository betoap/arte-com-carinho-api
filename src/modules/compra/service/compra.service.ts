import { Service } from "./../../../core/service";
import { CompraFilter } from './../filter/compra.filter';
import { Compra, ICompra } from './../document/Compra.document';

export class CompraService extends Service {
    
    public document: ICompra = new Compra;

    constructor() {
        super( new CompraFilter );
    }

}