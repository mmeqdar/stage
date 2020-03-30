const { USERS } = require('../../config/const').REQ;
const { ERRORS } = require('../../config/const').RESPONSES;
const Database = require('./dt');
const bcrypt = require('bcrypt');
const spliceString = require('splice-string');
const saltRounds = 10;
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'f4ffcff3',
  apiSecret: 'wCkkhwJTqa5MJ1dQ',
},{debug:true});



class User {
    constructor() 
    {
        this.database = new Database();
    }
    /*----------------------login-----------------*/
   login(phone,pswd)
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_BY_PHONE,phone)
            .then((r)=>
            {
                if(r[0].cnt != 0)
                {
                    if(bcrypt.compareSync(pswd, r[0].password))
                    {
                        if(r[0].confirmation != 0)
                        {
                            resolve({status :'success',data :"done"})
                        }
                        else
                        {
                            resolve({status :'failure',data :"VERIF"})
                        }
                    }
                    else
                    {
                        resolve({status :'failure',data :"LOGINPSWD"})
                    }
                }
                else
                {
                    resolve({status :'failure',data :"LOGINPHONE"})
                }
            })
            .catch((err)=>
            {
                console.log(err)
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    /*----------------------register-----------------*/
    register(name,phone,pswd,region)
    {
        console.log(phone)
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_BY_PHONE,phone)
            .then((r)=>
            {
                if(r[0].cnt != 0)
                {
                    console.log({status :'failure',data :ERRORS.REGISTER_PHONE})
                    resolve({status :'failure',data :"REGISTER_PHONE"})
                }
                else
                {
                    var salt = bcrypt.genSaltSync(saltRounds);
                    var hash_pass = bcrypt.hashSync(pswd, salt);
                    
                    this.database.query(USERS.ADD_USER,[name,phone,hash_pass,region])
                    .then((r)=>{
                        console.table(r)
                        if(r.err)
                        {
                            resolve({status :'failure',data :"GENERAL"})
                        }
                        else
                        {
                           const phone1 = spliceString(phone, 0, 1, '212');
                           nexmo.verify.request({
                                number: phone1,
                                brand: 'AgriEdge',
                                code_length: '4'
                              }, (err, result) => {
                                  console.log(result)
                                  if(err)
                                  {
                                      //mssa7 userr
                                      this.database.query(USERS.DELETE_USER,[phone])
                                     resolve({status :'failure',data :"GENERAL"})
                                  }
                                  else
                                  {
                                    if(result.request_id)
                                    {
                                        this.database.query(USERS.UPDATE_NEXMO,[result.request_id,phone])
                                        .then(resolve({status :'success',data :result.request_id}))
                                    }
                                    else
                                    {
                                        console.log("malooo")
                                        this.database.query(USERS.DELETE_USER,[phone])
                                        resolve({status :'failure',data :"GENERAL"})
                                    }
                                  }
                                    
                              });
                        }
                    })

                }
            })
        ))
    }
    /*----------------------confirmation-----------------*/
confirmation(id,code,phone)
    {
       return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_BY_NEXMO_PHONE,[id,phone])
            .then((r)=>
            {
                if(r[0].cnt != 0)
                {
                    nexmo.verify.check({
                        request_id: id,
                        code: code
                      }, (err, result) => {
                          
                        console.log(err ? err : result)
                        if(err)
                                  {
                                      resolve({status :'failure',data :"GENERAL"})
                                  }
                                  else
                                  {
                                    if(result.status === '0')
                                    {
                                        this.database.query(USERS.CONFIRMATON,[phone])
                                        resolve({status :'success',data :"done"})
                                    }
                                    else
                                        resolve({status :'failure',data :"GENERAL"})
                                  }
                      });
                }
                else
                {
                    resolve({status :'failure',data :"GENERAL"})
                }
            })
            .catch((err)=>
            {
                console.log(err)
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
/*----------------------send code for change pswd -----------------*/
forgot(phone)
    {
       return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_BY_PHONE,phone)
            .then((r)=>
            {
                if(r[0].cnt != 0)
                {
                    const phone1 = spliceString(phone, 0, 1, '212');
                           nexmo.verify.request({
                                number: phone1,
                                brand: 'AgriEdge',
                                code_length: '4'
                              }, (err, result) => {
                                  console.log(result)
                                  if(err)
                                  {
                                      //mssa7 userr
                                     resolve({status :'failure',data :"GENERAL"})
                                  }
                                  else
                                  {
                                    if(result.request_id)
                                    {
                                        this.database.query(USERS.UPDATE_NEXMO,[result.request_id,phone])
                                        .then(resolve({status :'success',data :result.request_id}))
                                    }
                                    else
                                    {
                                        resolve({status :'failure',data :"GENERAL"})
                                    }
                                  }
                                    
                              });
                }
                        else
                        {
                            resolve({status :'failure',data :"GENERAL"})
                        }
            })
            .catch((err)=>
            {
                console.log(err)
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    /*----------------------confirmation code change pswd-----------------*/
forgot1(id,code,phone)
    {
       return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_BY_NEXMO_PHONE,[id,phone])
            .then((r)=>
            {
                if(r[0].cnt != 0)
                {
                    nexmo.verify.check({
                        request_id: id,
                        code: code
                      }, (err, result) => {
                          
                        console.log(err ? err : result)
                        if(err)
                                  {
                                      resolve({status :'failure',data :"GENERAL"})
                                  }
                                  else
                                  {
                                    if(result.status === '0')
                                    {
                                        resolve({status :'success',data :"done"})
                                    }
                                    else
                                        resolve({status :'failure',data :"GENERAL"})
                                  }
                      });
                }
                else
                {
                    resolve({status :'failure',data :"GENERAL"})
                }
            })
            .catch((err)=>
            {
                console.log(err)
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    /*----------------------change pswd-----------------*/
    updatepswd(phone,pswd)
    {
        console.log(phone,pswd)
       return new Promise((resolve, reject) => ( 
        this.database.query(USERS.GET_BY_PHONE,phone)
        .then((r)=>
        {
            if(r[0].cnt != 0)
                {
                    var salt = bcrypt.genSaltSync(saltRounds);
                    var hash_pass = bcrypt.hashSync(pswd, salt);
                   this.database.query(USERS.UPDATE_PSWD,[hash_pass,phone])
                   .then(()=>
                   {
                        resolve({status :'success',data :"done"})
                   })
                   .catch(()=>
                       {
                           resolve({status :'failure',data :"GENERAL"})
                        })
                }
                else
                {
                    resolve({status :'failure',data :"GENERAL"})
                }
            })
            .catch((err)=>
            {
                console.log(err)
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    /*---------------------region------------------*/
    getRegion()
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_REGION)
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
    /*---------------------categorie------------------*/
    getCatergorie()
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_CATEGOY)
            .then((r)=>
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