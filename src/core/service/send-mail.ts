const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const sgTransport = require("nodemailer-sendgrid-transport");
const mailCredenciais = require('./../../../config/.mail');

class EnviarEmail {
     private mailer;

     public title:string;
     public templatePath:string;
     public templateName:string;
     public data:any;
     public from:string;
     public to:string;

     constructor (to?:string, from?:string, title?:string, template?:string, data?:any ) {
         this.to = to;
         this.from = from;
         this.title = title;
         this.template = template;
         this.data = data;
         this.mailer = nodemailer.createTransport( mailCredenciais );
         this.mailer.use( "compile", hbs( this.options() ) );
     }

     public set template( path: string ) {
         let _path = path.split('/');
         let total = _path.length;
         this.templateName = _path.splice(total-1, total)[0].split('.')[0];
         path = _path.join('/') + '/';
         this.templatePath = path;
     }

     public get template( ): string {
         return this.templatePath + this.templateName;
     }

     private options () {
         return {
             viewPath: this.templatePath,
             extName: ".hbs"
         }
     }

     public enviar() {
         return this.mailer.sendMail({
             from: this.from,
             to: this.to,
             subject: this.title,
             template: this.templateName,
             context: this.data
         });
     }
}

// const mail = new EnviarEmail(
//     "betoap.developer@gmail.com",
//     "betoap.developer@gmail.com",
//     "Email from teste",
//     "build/modulos/usuario/mail/cadastro.hbs",
//     {variable1 : 'value1',variable2 : 'value2'}
// );
// mail
//     .enviar()
//     .then( (resposta) => {
//         if(resposta)
//             console.log("Erro", resposta);
//     })
//     .catch( erro => console.log(erro) )
