const { USERS } = require('../../config/const').REQ;
const { ERRORS } = require('../../config/const').RESPONSES;
const Database = require('./dt');



class User {
    constructor() 
    {
        this.database = new Database();
    }
    /*---------------------search------------------*/
    search(cat,id)
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_BY_CAT,[cat,id]).then((r)=>
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
    all_user()
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_ALL_CF).then((r)=>
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
    get_all_ann(id)
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_ANN_NFO,id).then((r)=>
            {
                resolve(r)
            })
            .catch((er)=>
            {
                console.log(er)
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    get_all_ann_CF(id)
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_ANN_CF,id).then((r)=>
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