const { USERS } = require('../../config/const').REQ;
const { ERRORS } = require('../../config/const').RESPONSES;
const Database = require('./dt');
const bcrypt = require('bcrypt');
const spliceString = require('splice-string');
const saltRounds = 10;
const Nexmo = require('nexmo');
const jwt = require('jsonwebtoken');
const nexmo = new Nexmo({
  apiKey: '9e22b6f1',
  apiSecret: 'GEZ3S1EYtmBGDPoB',
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
                            console.log(r[0].type)
                            const token = jwt.sign({ id: r[0].id_user },'mmeqfall')
                            const type = jwt.sign({ type: r[0].type },'mmeqfall')
                            resolve({status :'success',data:r[0].type,token:token,type:type})
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
    register(name,phone,pswd,type,lat,lng)
    {
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
                    var pic = "default.jpg"
                    if(type == 0)
                        pic = "shop.png"
                    if(type == 2)
                        pic = "ferme.png"
                    this.database.query(USERS.ADD_USER,[name,phone,hash_pass,type,pic,lat,lng])
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
                            .then(()=>
                            {
                                this.database.query(USERS.GET_BY_PHONE,phone)
                                .then((r)=>
                                {
                                    console.log("done")
                                    const token = jwt.sign({ id: r[0].id_user },'mmeqfall')
                                    const type = jwt.sign({ type: r[0].type },'mmeqfall')
                                    resolve({status :'success',data:r[0].type,token:token,type:type})
                                })
                            })
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
    /*--------------------get info-----------*/
    get_info(id)
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_INFO,id)
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
    update(id,name,pswd)
    {
        var req
        if(name && !pswd)
             req =this.database.query(USERS.UPDATE_NAME,[name,id])
        if(!name && pswd)
            {
                var salt = bcrypt.genSaltSync(saltRounds);
                var hash_pass = bcrypt.hashSync(pswd, salt);
                 req =this.database.query(USERS.UPDATE_PSWD_BY_ID,[hash_pass,id])
            }
        if(name && pswd)
            {
                var salt = bcrypt.genSaltSync(saltRounds);
                var hash_pass = bcrypt.hashSync(pswd, salt);
                req =this.database.query(USERS.UPDATE_NAME_PSWD,[name,hash_pass,id])
            }

            return new Promise((resolve, reject) => ( 
            req
            .then(()=>
            {
                resolve({status :'success',data :"done"})
            })
            .catch((r)=>
            {
                console.log(r)
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    update_pic(pic,id)
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.UPDATE_PROFIL,[pic,id])
            .then((r)=>
            {
                console.log("doneee2")
                resolve({status :'success',data :"done"})
            })
            .catch(()=>
            {console.log("noonn2")
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    add_cart(id_user,id_annonce,quantite)
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.COUNT_CART,[id_user,id_annonce])
            .then((r)=>
            {
                if(r[0].cnt == 0)
                {
                    this.database.query(USERS.INSERT_CART,[id_user,id_annonce,quantite])
                    .then((r)=>
                    {
                        this.database.query(USERS.GET_QUNATITE_ANN,[id_annonce])
                        .then((r)=>
                        {
                            const q = r[0].quantity - quantite
                            this.database.query(USERS.UPDATE_ANN_QUANTITE,[q,id_annonce])
                            .then((r)=>
                            {
                                console.log("done")
                                resolve({status :'success',data :"done"})
                            })
                            .catch(()=>
                            {
                                console.log("erreeuuuuurr")
                                resolve({status :'failure',data :"GENERAL"})
                            })
                        })
                        .catch(()=>
                        {
                            console.log("erreeuuuuurr")
                            resolve({status :'failure',data :"GENERAL"})
                        })
                    })
                    .catch(()=>
                    {
                        console.log("erreeuuuuurr")
                        resolve({status :'failure',data :"GENERAL"})
                    })
                }
                else
                {
                    console.log("deja")
                    resolve({status :'failure',data :"CART"})
                }
            })
        ))
    }
    get_cart(id)
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_CART,id)
            .then((r)=>
            {
                console.log(r)
                resolve(r)
            })
            .catch(()=>
            {
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    add_local(id,lat,lng)
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_INFO,id)
            .then((r)=>
            {
                this.database.query(USERS.ADD_FERME,[id,lat,lng,r[0].type])
                .then((r)=>
                {
                    console.log("done")
                    console.log(r)
                    resolve(r)
                })
            })
            .catch(()=>
            {
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    get_local(id)
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_FERME,id)
            .then((r)=>
            {
                console.table(r)
                resolve(r)
            })
            .catch(()=>
            {
                resolve({status :'failure',data :"GENERAL"})
            })
        ))
    }
    get_coop(id)
    {
        return new Promise((resolve, reject) => ( 
            this.database.query(USERS.GET_COOP,id)
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