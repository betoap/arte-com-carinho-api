import { Service } from "./../../../core/service";
import { ClienteFilter } from './../filter/cliente.filter';
import { Cliente, ICliente } from './../document/Cliente.document';

export class ClienteService extends Service {
    
    public document: ICliente = new Cliente;

    constructor() {
        super( new ClienteFilter );
    }

}