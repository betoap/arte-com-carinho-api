import { Request, Response } from "express";
import * as jwt from 'jwt-simple';
import * as moment from 'moment';
import * as bodyParser from 'body-parser';


export class Authentication {

    private static _jwt:any = require('./../../config/.jwt');

    constructor( private app? ) { }

    private validToken(): void {
        var jsonParser = bodyParser.json();
        this.app.use( jsonParser, ( req:Request, res:Response, next:Function ) => {
            if( req.method === "OPTIONS" ) next();
            const originalUrl: String = req.originalUrl.split( '?' )[0];
            const path: Array<string> = originalUrl.split('/');
            const module = path[1];
            
            let pageNotCheckCredentials: boolean = true;
            if( Authentication._jwt.moduleAccess.indexOf( module ) > -1 ) {
                let findPath: Array<string> = [ ...path ];
                findPath.shift();
                findPath.shift();
                findPath.forEach( page => {
                    if( Authentication._jwt.pageAccess.indexOf( page ) === -1 ) {
                        pageNotCheckCredentials = false;
                    };
                });
            }

            if(
                pageNotCheckCredentials &&
                (
                    path.indexOf('resetpassword') > -1 ||
                    path.indexOf('reset-password') > -1 ||
                    Authentication._jwt.moduleAccess.indexOf( 'login' ) > -1
                ) &&
                (
                    req.method === "POST" ||
                    req.method === "OPTIONS" ||
                    req.method === "PUT"
                )
            ) {
                return next();
            }
            let token = req.headers[Authentication._jwt.header];
            if ( token ) {
                try {
                    let decoded = jwt.decode(token.toString(), Authentication._jwt.key);
                    if ( decoded.exp  && decoded.exp <= Date.now() ) {
                        return res.status( 401 ).json({
                            message: "Não autorizado: o token exprirou."
                        });
                    }
                    req['userLogged'] = decoded;
                    return next();
                } catch ( err ) {
                    return res.status( 401 ).json({
                        message: "Não autorizado: token inválido"
                    });
                }
            }
            return res.status( 401 ).json({
                message: "Não autorizado: token não encontrado no HEADER"
            });            
        });
    }

    public static geraToken( res: Response, payload: any ): any {
        moment.locale('pt-BR');
        let response: any = {};
        let expires: any;
        let expire: boolean = Authentication._jwt.expire != undefined;
        if ( expire ) {
            expires = moment().add(Authentication._jwt.expire, 'seconds');
            response.expire = expires;
            payload.exp = expires;
        }
        let token = jwt.encode(payload, Authentication._jwt.key);
        res["token"] = token;
        response.token = token;
        return response;
    }
}