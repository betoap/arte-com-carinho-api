const validate = require("validate.js");

export abstract class Filter
{
    protected restrictions: any;

    constructor()
    {
        this.restrictions = {};
    }

    public hasErrors(object: any): any
    {
        return validate(object, this.restrictions);
    }
}
