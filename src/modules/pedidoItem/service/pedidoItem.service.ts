import { Service } from "./../../../core/service";
import { PedidoItemFilter } from './../filter/pedidoItem.filter';
import { PedidoItem, IPedidoItem } from './../document/PedidoItem.document';

export class PedidoItemService extends Service {
    
    public document: IPedidoItem = new PedidoItem;

    constructor() {
        super( new PedidoItemFilter );
    }

}