import { Server } from 'http' ;
import * as moment from 'moment';

export const normalizePort = (val: number | string): number | string | boolean => {
    let port: number = (typeof val === 'string') ? parseInt(val) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}


export const getIp = ( req ) => {
    return (req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress).split(",")[0];
}

export const onError = (server: Server) => {
    return (error: NodeJS.ErrnoException): void => {
        let port: number | string = (<any>error).port;
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof port === 'string') ? `pipe ${port}` : `port ${port}`;
        switch(error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                break;
            default:
                throw error;
        }
        process.exit(1);
    }
}

export const onListening = (server: Server) => {
    return (): void => {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening at ${bind}...`);
    }
}
export class Proxy{
    public static create (scope:any, method:Function, ...params ): any {
        var aArgs:Array<any> = Array.prototype.slice.call(arguments, 2);
        return function () {
            const _arr = Array.prototype.slice.call(arguments, 0);
            return method.apply(scope, aArgs.concat(_arr));
        };
    }
}


import chalk from 'chalk';
import * as fs from 'fs';

export class Logger {

    constructor() {
    }

    public static writeLog(data: object): void {
        const date = moment().format("YYYY_MM_DD");
        fs.appendFile(`${__dirname}/../logs/logger__${date}.log`, `${JSON.stringify(data)}\n`, (e) => {
            if(e)
                Logger.debug(`Write error: ${JSON.stringify(e)}`)
        })
    }

    public static timeNow(): string {
        const date = moment().format("YYYY-MM-DD");
        const hour = moment().format("HH:mm:ss");
        return `${date} ${hour}`;
    }

    public static debug(msg: string, exception: any = ""): void {
        const payload = (typeof exception === 'object') ? JSON.stringify(exception) : exception;
        const content = chalk`{bold [${Logger.timeNow()}]}{gray [DEBUG]} ${msg} ${payload}`;
        console.log(content);
    }

    public static ok(msg: string, exception: any = ""): void {
        const timeNow = Logger.timeNow();
        const payload = (typeof exception === 'object') ? JSON.stringify(exception) : exception;
        const content = chalk`{bold [${timeNow}]}{green [OK]} ${msg} ${payload}`;
        console.log(content);
        Logger.writeLog({ type: 'ok', time: timeNow, msg: { msg, payload } });
    }

    public static info(msg: string, exception: any = ""): void {
        const timeNow = Logger.timeNow();
        const payload = (typeof exception === 'object') ? JSON.stringify(exception) : exception;
        const content = chalk`{bold [${Logger.timeNow()}]}{cyan [INFO]} ${msg} ${payload}`;
        console.log(content);
        Logger.writeLog({ type: 'info', time: timeNow, msg: { msg, payload } });
    }

    public static warn(msg: string, exception: any = ""): void {
        const timeNow = Logger.timeNow();
        const payload = (typeof exception === 'object') ? JSON.stringify(exception) : exception;
        const content = chalk`{bold [${timeNow}]}{yellow [WARN]} ${msg} ${payload}`;
        console.log(content);
        Logger.writeLog({ type: 'warn', time: timeNow, msg: { msg, payload } });
    }

    public static error(msg: string, exception: any = ""):  void {
        const timeNow = Logger.timeNow();
        const payload = (typeof exception === 'object') ? JSON.stringify(exception) : exception;
        const content = chalk`{bold [${timeNow}]}{red [ERROR]} ${msg} ${payload}`;
        console.log(content);
        Logger.writeLog({ type: 'error', time: timeNow, msg: { msg, payload } });
    }

}
