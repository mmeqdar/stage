const express = require('express');
const router = express.Router();
const User = require('../models/m_user');
const Token = require('../models/m_token');
var multer  = require('multer');
const isEmpty  = require('../utils/isEmpty')
const ipInfo = require("ipinfo");
const { ERRORS } = require('../../config/const').RESPONSES;

const login =  router.post('/login', function (req, res) {
    console.log("phone : "+ req.body.phone)
    console.log("pswd : "+ req.body.pswd)
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
                    .catch(()=>{
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
/*---------------ipinfo---------*/
const local = router.post('/local' , function(req, res) {
    ipInfo((err, cLoc) => {
        const test = cLoc.loc;
        const t = test.split(',');
        console.log(t)
        res.send(t)
        console.table(t)
    })
})
const register =  router.post('/register', function (req, res) {
    if(req.body.phone && req.body.name && req.body.pswd )
        {
            console.table(req.body)
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
                        if(req.body.type == 1 || req.body.type == 2 || req.body.type == 0 )
                        {
                            const user = new User()
                            console.log("emptyy")
                            ipInfo((err, cLoc) => {
                                console.log()
                                const test = cLoc.loc;
                                const t = test.split(',');
                               var lat = t[0]
                                var lng = t[1]
                                console.log("1) llaaattt : "+lat+" , llnnngg : "+lng)
                                user.register(req.body.name,req.body.phone,req.body.pswd,req.body.type,lat,lng)
                                .then((r)=>
                                {
                                    console.log(r)
                                    res.send(r)
                                })
                                .catch((err)=>{
                                    resolve({status :'failure',data :"GENERAL"})
                                })
                            })
                        }
                        else
                        {
                            console.log("tyypppee")
                            res.send({status :'failure',data :"TYPE"})
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
const get_info =  router.post('/get_info', function (req, res) {
    const user = new User()
    const token = new Token()
    token.token(req.body.token).then((r)=>{
        if(r !== -2)
        {
            user.get_info(r)
            .then((r)=>
            {
                res.send(r)
            })
            .catch((err)=>{
                res.send({status :'failure',data :"GENERAL"})
            })
        }
        else
        res.send({status :'failure',data :"GENERAL"})
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
const update =  router.post('/update', function (req, res) {
    const token = new Token()
    token.token(req.body.token).then((r)=>{
        if(r !== -2)
        {
            if(req.body.name || req.body.pswd )
                {
                    if(req.body.name)
                    {
                        var letter = /^[a-zA-Z ]+$/;
                        if(!(req.body.name.length >= 5 && req.body.name.length <= 30 && req.body.name.match(letter)))
                        {
                            console.log("NAME")
                            res.send({status :'failure',data :"NAME"})
                        }
                    }
                    if(req.body.pswd)
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
                            if(!(n != 0 && u != 0 && l != 0 && req.body.pswd.length > 5 && req.body.pswd.length < 20))
                            {
                                console.log('pswd')
                                res.send({status :'failure',data :"PSWD"})
                            }
                    }
                    const user = new User()
                    user.update (r,req.body.name,req.body.pswd)
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
                    console.log("DATA_MISSING")
                    res.send({status :'failure',data :"DATA_MISSING"})
                }
        }
        else
            res.send({status :'failure',data :"GENERAL"})
        })
        .catch((err)=>{
            res.send({status :'failure',data :"GENERAL"})
        })
});
/*---------------update pic -------------*/
var storage = multer.diskStorage({
    
    destination: function(req, file, cb) {
        cb(null, './src/images');
    },
    filename: function(req, file, cb) {
        cb(null, 'img-profil-' + Date.now()+file.originalname)
    },
    
  });
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            
        }
    },
    
});
const update_pic =  router.post('/update_pic', upload.array('pic',1),async  (req, res)=> {
    const user = new User()
    const token = new Token()
    console.log("doneee11" +req.files[0].filename)
    token.token(req.body.token).then((r) => {
        if(r !== -2)
        {
            console.log(r)
            user.update_pic(req.files[0].filename,r)
            .then((r)=>
            {
                res.send(r)
            })
            .catch(()=>{
                res.send({status :'failure',data :"GENERAL"})
            })
        }
        else
        res.send({status :'failure',data :"GENERAL"})
    })
    .catch(()=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
const add_cart =  router.post('/add_cart', function (req, res) {
    const user = new User()
    const token = new Token()
    token.token(req.body.token).then((r)=>{
        if(r !== -2)
        {
            user.add_cart(r,req.body.id,req.body.quantite)
            .then((r)=>
            {
                res.send(r)
            })
            .catch((err)=>{
                res.send({status :'failure',data :"GENERAL"})
            })
        }
        else
        res.send({status :'failure',data :"GENERAL"})
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
const get_cart =  router.post('/get_cart', function (req, res) {
    const user = new User()
    const token = new Token()
    token.token(req.body.token).then((r)=>{
        if(r !== -2)
        {
            user.get_cart(r)
            .then((r)=>
            {
                res.send(r)
            })
            .catch((err)=>{
                res.send({status :'failure',data :"GENERAL"})
            })
        }
        else
        res.send({status :'failure',data :"GENERAL"})
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
const add_local =  router.post('/add_local', function (req, res) {
    const user = new User()
    const token = new Token()
    token.token(req.body.token).then((r)=>{
        if(r !== -2)
        {
            user.add_local(r,req.body.lat,req.body.lng)
            .then((r)=>
            {
                res.send(r)
            })
            .catch((err)=>{
                res.send({status :'failure',data :"GENERAL"})
            })
        }
        else
        res.send({status :'failure',data :"GENERAL"})
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
const get_local =  router.post('/get_local', function (req, res) {
    const user = new User()
    const token = new Token()
    token.token(req.body.token).then((r)=>{
        if(r !== -2)
        {
            user.get_local(r)
            .then((r)=>
            {
                console.log(r)
                res.send(r)
            })
            .catch((err)=>{
                res.send({status :'failure',data :"GENERAL"})
            })
        }
        else
        res.send({status :'failure',data :"GENERAL"})
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
const get_coop =  router.post('/get_coop', function (req, res) {
    const user = new User()
    const token = new Token()
    // var t = 0
    token.token(req.body.token).then((ra)=>{
        if(ra !== -2)
        {
            user.get_coop(ra)
            .then((r)=>
            {
                res.send(r)
            })
            .catch((err)=>{
                res.send({status :'failure',data :"GENERAL"})
            })
        }
        else
        res.send({status :'failure',data :"GENERAL"})
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
module.exports = get_info
module.exports = update
module.exports = update_pic
module.exports = local
module.exports = add_cart
module.exports = get_cart
module.exports = add_local
module.exports = get_local
module.exports = get_coop
