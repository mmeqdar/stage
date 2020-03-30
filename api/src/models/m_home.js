const { USERS } = require('../../config/const').REQ;
const { ERRORS } = require('../../config/const').RESPONSES;
const Database = require('./dt');



class User {
    constructor() 
    {
        this.database = new Database();
    }
    /*---------------------search------------------*/
    search(reg,cat)
    {
        console.log(reg,cat)
        var req=null
        if(reg != null && cat == null)
            req = this.database.query(USERS.GET_BY_REG,reg)
        if(reg == null && cat != null)
            req = this.database.query(USERS.GET_BY_CAT,cat)
        if(reg != null && cat != null)
            req = this.database.query(USERS.GET_BY_CAT_REG,[reg,cat])
        return new Promise((resolve, reject) => ( 
            req.then((r)=>
            {
                resolve(r)
            })
            .catch(()=>
            {
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    /*---------------------all------------------*/
    all()
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_ALL).then((r)=>
            {
                console.log(r)
                    resolve(r); 
                
            })
            .catch(()=>
            {
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    get_ann(id)
    {
        console.log("22222")
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_ANN,id).then((r)=>
            {
                resolve(r)
            })
            .catch(()=>
            {
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    
}
module.exports = User