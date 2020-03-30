const express = require('express');
const router = express.Router();
const User = require('../models/m_user');
const { ERRORS } = require('../../config/const').RESPONSES;

const login =  router.post('/login', function (req, res) {

    if(req.body.phone && req.body.pswd )
        {
            if(req.body.phone.length === 10 && Number.isInteger(parseInt(req.body.phone)))
            {
                var n = 0, u = 0,l = 0, Upper = /^[A-Z]+$/, Lower = /^[a-z]+$/, number = /^[0-9]+$/;
                for(var i = 0 ;i<req.body.pswd .length;i++)
                {
                    if(req.body.pswd[i].match(Upper))
                        u = 1
                    if(req.body.pswd[i].match(Lower))
                        l = 1
                    if(req.body.pswd[i].match(number))
                        n = 1
                }
                if(n != 0 && u != 0 && l != 0 && req.body.pswd.length > 5 && req.body.pswd.length < 20)
                {
                    const user = new User()
                    user.login(req.body.phone,req.body.pswd)
                    .then((r)=>
                    {
                        res.send(r)
                    })
                    .catch((err)=>{
                        resolve({status :'failure',data :"GENERAL"})
                    })
                }
                else
                {   
                    res.send({status :'failure',data :"LOGINPSWD"})
                }
            }
            else
            {
                console.log("PHONE")
                res.send({status :'failure',data :"PHONE"})
            }
                
        }
        else
        {
            console.log("DATA_MISSING")
            res.send({status :'failure',data :"DATA_MISSING"})
        }
});

const register =  router.post('/register', function (req, res) {
    //const user = new User()
    console.log("name : "+ req.body.name)
    console.log("phone : "+ req.body.phone)
    console.log("pswd : "+ req.body.pswd)
    console.log("region :"+ req.body.region)
    if(req.body.phone && req.body.name && req.body.pswd )
        {
            var letter = /^[a-zA-Z ]+$/;
            if(req.body.name.length >= 5 && req.body.name.length <= 30 && req.body.name.match(letter))
            {
                if(req.body.phone.length === 10 && Number.isInteger(parseInt(req.body.phone)))
                {
                    var n = 0, u = 0,l = 0, Upper = /^[A-Z]+$/, Lower = /^[a-z]+$/, number = /^[0-9]+$/;
                    for(var i = 0 ;i<req.body.pswd .length;i++)
                    {
                    if(req.body.pswd[i].match(Upper))
                        u = 1
                    if(req.body.pswd[i].match(Lower))
                        l = 1
                    if(req.body.pswd[i].match(number))
                        n = 1
                    }
                    if(n != 0 && u != 0 && l != 0 && req.body.pswd.length > 5 && req.body.pswd.length < 20)
                    {
                        if(req.body.region === 1 || req.body.region === 2 || req.body.region === 3 || req.body.region === 4 || req.body.region === 5 || req.body.region === 6 || req.body.region === 7 || req.body.region === 8 || req.body.region === 9 || req.body.region === 10 || req.body.region === 11 || req.body.region === 12)
                        {
                            const user = new User()
                            user.register(req.body.name,req.body.phone,req.body.pswd,req.body.region)
                            .then((r)=>
                            {
                                console.log(r)
                                res.send(r)
                            })
                            .catch((err)=>{
                                resolve({status :'failure',data :"GENERAL"})
                            })
                        }
                        else
                        {
                            res.send({status :'failure',data :"REGION"})
                        }
                    }
                    else
                    {   
                        res.send({status :'failure',data :"PSWD"})
                    }
                }
                else
                {
                    console.log("PHONE")
                    res.send({status :'failure',data :"PHONE"})
                }
            }
            else
            {
                console.log("NAME")
                res.send({status :'failure',data :"NAME"})
            }
                    
        }
        else
        {
            console.log("DATA_MISSING")
            res.send({status :'failure',data :"DATA_MISSING"})
        }
});
const confirmation =  router.post('/confirmation', function (req, res) {
    const user = new User()
    console.log("id : "+req.body.id)
    console.log("code : "+ req.body.code)
    console.log("phone : "+ req.body.phone)
    if(req.body.phone && req.body.code && req.body.id)
    {
        if(req.body.phone.length === 10 && Number.isInteger(parseInt(req.body.phone)))
        {
            if(req.body.code.length === 4 && Number.isInteger(parseInt(req.body.code)))
            {
                user.confirmation(req.body.id,req.body.code,req.body.phone)
                .then((r)=>
                {
                    res.send(r)
                })
                .catch((err)=>{
                    resolve({status :'failure',data :"GENERAL"})
                })
            }
            else
            {
                res.send({status :'failure',data :"CODE"})
            }
        }
        else
        {
                res.send({status :'failure',data :"PHONE"})
        }
    }
    else
    {
        resolve({status :'failure',data :"GENERAL"})
    }
});

const forgot =  router.post('/forgot', function (req, res) {
    const user = new User()
    console.log("phone : "+ req.body.phone)
    if(req.body.phone)
    {
        if(req.body.phone.length === 10 && Number.isInteger(parseInt(req.body.phone)))
        {
                user.forgot(req.body.phone)
                .then((r)=>
                {
                    res.send(r)
                })
                .catch((err)=>{
                    resolve({status :'failure',data :"GENERAL"})
                })
        }
        else
        {
                res.send({status :'failure',data :"PHONE"})
        }
    }
    else
    {
        resolve({status :'failure',data :"GENERAL"})
    }
});
const forgot1 =  router.post('/forgot1', function (req, res) {
    const user = new User()
    console.log("id : "+req.body.id)
    console.log("code : "+ req.body.code)
    console.log("phone : "+ req.body.phone)
    if(req.body.phone && req.body.code && req.body.id)
    {
        if(req.body.phone.length === 10 && Number.isInteger(parseInt(req.body.phone)))
        {
            if(req.body.code.length === 4 && Number.isInteger(parseInt(req.body.code)))
            {
                user.forgot1(req.body.id,req.body.code,req.body.phone)
                .then((r)=>
                {
                    res.send(r)
                })
                .catch((err)=>{
                    res.send({status :'failure',data :"GENERAL"})
                })
            }
            else
            {
                res.send({status :'failure',data :"CODE"})
            }
        }
        else
        {
                res.send({status :'failure',data :"PHONE"})
        }
    }
    else
    {
        resolve({status :'failure',data :"GENERAL"})
    }
});
const updatepswd =  router.post('/updatepswd', function (req, res) {
    const user = new User()
    console.log("new :" +req.body.phone)
    console.log("new2 :" +req.body.pswd)
    if(req.body.pswd && req.body.phone)
    {
        if(req.body.phone.length === 10 && Number.isInteger(parseInt(req.body.phone)))
        {
            var n = 0, u = 0,l = 0, Upper = /^[A-Z]+$/, Lower = /^[a-z]+$/, number = /^[0-9]+$/;
            for(var i = 0 ;i<req.body.pswd .length;i++)
            {
            if(req.body.pswd[i].match(Upper))
                u = 1
            if(req.body.pswd[i].match(Lower))
                l = 1
            if(req.body.pswd[i].match(number))
                n = 1
            }
            if(n != 0 && u != 0 && l != 0 && req.body.pswd.length > 5 && req.body.pswd.length < 20)
            {
                user.updatepswd(req.body.phone,req.body.pswd)
                .then((r)=>
                {
                    res.send(r)
                })
                .catch((err)=>{
                    res.send({status :'failure',data :"GENERAL"})
                })
            }
            else
            {
                res.send({status :'failure',data :"PSWD"})
            }  
        }
        else
        {
                res.send({status :'failure',data :"PHONE"})
        }
    }
    else
    {
        
        res.send({status :'failure',data :"GENERAL"})
    }
});
const getRegion =  router.post('/getRegion', function (req, res) {
    const user = new User()
    user.getRegion()
    .then((r)=>
    {
        res.send(r)
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
const getCatergorie =  router.post('/getCatergorie', function (req, res) {
    const user = new User()
    user.getCatergorie()
    .then((r)=>
    {
        res.send(r)
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
module.exports = login
module.exports = register
module.exports = confirmation
module.exports = forgot
module.exports = forgot1
module.exports = updatepswd
module.exports = getRegion
module.exports = getCatergorie