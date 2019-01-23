import { Service } from "./../../../core/service";
import { PersonalizadoFilter } from './../filter/personalizado.filter';
import { Personalizado, IPersonalizado } from './../document/Personalizado.document';

export class PersonalizadoService extends Service {
    
    public document: IPersonalizado = new Personalizado;

    constructor() {
        super( new PersonalizadoFilter );
    }

}