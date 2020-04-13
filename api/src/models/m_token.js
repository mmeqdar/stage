const { USERS } = require('../../config/const').REQ;
const { ERRORS } = require('../../config/const').RESPONSES;
const Database = require('./dt');
const jwt = require('jsonwebtoken');


class Token {
    constructor() 
    {
        this.database = new Database();
    }
    /*---------------------categorie------------------*/
 token(token)
{
    return new Promise((resolve, reject) => {
    if (!token) {
        //res.status(401);
        resolve("-2")
    }
    try {
        const decoded = jwt.verify(token, "mmeqfall")
        resolve(decoded.id)
    } catch (ex) {
        //res.status(401);
        resolve('-2');
    }
})
}
   
}
module.exports = Token