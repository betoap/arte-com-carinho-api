import { Service } from "./../../../core/service";
import { ConfigFilter } from './../filter/config.filter';
import { Config, IConfig } from './../document/Config.document';

export class ConfigService extends Service {
    
    public document: IConfig = new Config;

    constructor() {
        super( new ConfigFilter );
    }

}