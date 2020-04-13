const { USERS } = require('../../config/const').REQ;
const Database = require('./dt');

class Annonce {
    constructor() 
    {
        this.database = new Database();
    }
    annonce(des,quantity,prix,id_category,id,type_annonce)
    {
        console.log("-------model------")
        return new Promise((resolve, reject) => (
            this.database.query(USERS.ADD_ANNONCE,[des,quantity,prix,id_category,id,type_annonce])
            .then((r)=>
            {
                console.log("-------model------")
                console.log(r)
                resolve(r)
            })
            .catch((err)=>
            {
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    pic(file,id_annonce,i)
    {
        return new Promise((resolve, reject) => (
            this.database.query(USERS.ADD_IMAGE,[file,id_annonce,i])
            .then(() => {
            })
            .catch((err => {
                return reject(err)
                })
              )
            ))
    }
    /*---------------------Category------------------*/
    getCategorie()
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_CATEGOY)
            .then((r)=>
            {
                resolve(r)
            })
            .catch((err)=>
            {
                console.log(err)
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    /*---------------------My_Annonce------------------*/
    //----------get_myAnnonce-----------
    get_myAnn(id)
    {
        console.log("------------------"+id+"-----------")
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.Get_MY_ANN,id).then((r)=>
            {
                resolve(r)
            })
            .catch(()=>
            {
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    //----------update_myAnnonce--------
    editAnnonce(id_an,id,q,p,d)
    {
        console.log("------------------("+id+")-----------")
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.UPDATE_ANN,[d,q,p,id,id_an]).then((r)=>
            {
                resolve(r)
            })
            .catch(()=>
            {
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    //----------delete_myAnnonce--------
    deleteAnnonce(id_an,id)
    {
        console.log("---------dddddddddddddd---------("+id+")-----------")
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.DELETE_ANN,[id_an, id]).then((r)=>
            {
                console.log("---------rrreeeessssss-----------")
                resolve(r)
            })
            .catch(()=>
            {
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
}
module.exports = Annonce