import { Service } from "./../../../core/service";
import { PedidoFilter } from './../filter/pedido.filter';
import { Pedido, IPedido } from './../document/Pedido.document';

export class PedidoService extends Service {
    
    public document: IPedido = new Pedido;

    constructor() {
        super( new PedidoFilter );
    }

}