const { USERS } = require('../../config/const').REQ;
const { ERRORS } = require('../../config/const').RESPONSES;
const Database = require('./dt');



class User {
    constructor() 
    {
        this.database = new Database();
    }
    /*---------------------search------------------*/
    search(reg,cat,type)
    {
        console.log(reg,cat)
        var req=null
        if(reg != null && cat == null)
            req = this.database.query(USERS.GET_BY_REG,[reg,type])
        if(reg == null && cat != null)
            req = this.database.query(USERS.GET_BY_CAT,[cat,type])
        if(reg != null && cat != null)
            req = this.database.query(USERS.GET_BY_CAT_REG,[reg,cat,type])
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
    all(type)
    {
        console.log("tet")
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_ALL,type).then((r)=>
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