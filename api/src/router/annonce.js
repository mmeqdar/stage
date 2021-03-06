const express = require('express');
const router = express.Router();
const Annonce = require('../models/m_annonce');
const Token = require('../models/m_token');
const isEmpty  = require('../utils/isEmpty')
var multer  = require('multer')
const { ERRORS } = require('../../config/const').RESPONSES;

let err
  //----------MULTER------------
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/images');
    },
    filename: function(req, file, cb) {
        cb(null, 'img-' + Date.now()+file.originalname)
    }
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
    }
});

//------------------Add Pic-------------------
//----Offre-------/
const annonce = router.post('/annonce', upload.array('pic',6),async (req, res) => {
  var id_annonce
  var type_annonce = 0
  const annonce = new Annonce()
  const token = new Token()
    token.token(req.body.token).then((r) => {
        if(r !== -2)
        {
            if(isEmpty(req.body.category) || isEmpty(req.body.quantity) || isEmpty(req.body.prix) || isEmpty(req.body.desc) || req.files.length == 0)
            {
                console.log(ERRORS.DATA_MISSING)
                res.send({status :'failure',data :"DATA_MISSING"})
            }
            else if(!Number.isInteger(parseInt(req.body.quantity)) || req.body.quantity <= 0 )
            {
                res.send({status :'failure',data :"QUANTITY_WRONG"})
            }
            else if(!Number.isInteger(parseInt(req.body.prix)) || req.body.prix <= 0)
            {
                res.send({status :'failure',data :"PRIX_WRONG"})
            }
            else if(req.body.desc.length > 200)
            {
                res.send({status :'failure',data :"DES_WRONG"})
            }
            else
            {
                annonce.annonce(req.body.desc, req.body.quantity, req.body.prix, req.body.category,r,type_annonce,req.body.id_cf)
                .then((r)=>
                {
                    id_annonce = r.insertId 
                    for(var i = 0; i < req.files.length; i++)
                    {
                        annonce.pic(req.files[i].filename,id_annonce,i)
                        .then(()=>
                        {
                            
                        })
                        
                    }
                    res.send({status :'success',data : r })
                })
                .catch((err)=>{
                    res.send({status :'failure',data :"GENERAL"})
                })
            }
        }
        else
            res.send({status :'failure',data :"GENERAL"})
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
})
//----Demande-------/
const demande = router.post('/demande', upload.array('pic',6),async (req, res) => {
  var id_annonce
  var type_annonce = 1
  const annonce = new Annonce()
  const token = new Token()
    token.token(req.body.token).then((r) => {
        if(r !== -2)
        {
        if(isEmpty(req.body.category) || isEmpty(req.body.quantity) || isEmpty(req.body.prix) || isEmpty(req.body.desc))
        {
            console.log(ERRORS.DATA_MISSING)
            res.send({status :'failure',data :"DATA_MISSING"})
        }
        else if(!Number.isInteger(parseInt(req.body.quantity)) || req.body.quantity <= 0 )
        {
            res.send({status :'failure',data :"QUANTITY_WRONG"})
        }
        else if(!Number.isInteger(parseInt(req.body.prix)) || req.body.prix <= 0)
        {
            res.send({status :'failure',data :"PRIX_WRONG"})
        }
        else if(req.body.desc.length > 200)
        {
            res.send({status :'failure',data :"DES_WRONG"})
        }
        else
        {
            annonce.annonce(req.body.desc, req.body.quantity, req.body.prix, req.body.category,r, type_annonce)
            .then((r)=>
            {
                console.log("-------roter------")
                console.log(r)
                id_annonce = r.insertId 
                if(req.files.length == 0)
                {
                    annonce.pic("noImage.png",id_annonce,0)
                    .then(()=>
                    {
                    })
                }
                else
                {
                    for(var i = 0; i < req.files.length; i++)
                    {
                        annonce.pic(req.files[i].filename,id_annonce,i)
                        .then(()=>
                        {
                        })
                    }
                }
                
                res.send({status :'success',data : r })
            })
            .catch((err)=>{
                res.send({status :'failure',data :"GENERAL"})
            })
        }
}
else
            res.send({status :'failure',data :"GENERAL"})
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
})
//-------------------Category-------------------
const getCat =  router.post('/getCat', function (req, res) {
    const annonce = new Annonce()
    annonce.getCategorie()
    .then((r)=>
    {
        res.send(r)
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
/*----------------------MY ANNONCE----------------------*/
//-------------------Get_Annonce-------------------
const get_myAnn =  router.post('/get_myAnn', function (req, res) {
    const annonce = new Annonce()
    annonce.get_myAnn(req.body.id)
    .then((r)=>
    {
        console.table(r)
        res.send(r)
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});

//-------------------Update_Annonce-------------------
const editAnnonce =  router.post('/editAnnonce', function (req, res) {
    const annonce = new Annonce()
    const token = new Token()
    console.table(req.body)
    token.token(req.body.token).then((r) => {
        if(r !== -2)
        {
            console.log("--------------(("+r+"))-----------")
            annonce.editAnnonce(req.body.id_ann,r,req.body.quantity,req.body.prix,req.body.desc)
            .then((r)=>
            {
                console.table(r)
                res.send({status :'success',data : r })
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
//-------------------Delete_Annonce-------------------
const deleteAnnonce =  router.post('/deleteAnnonce', function (req, res) {
    const annonce = new Annonce()
    const token = new Token()
    console.table(req.body)
    token.token(req.body.token).then((r) => {
        if(r !== -2)
        {
            console.log("--------ddeeelll------(("+r+"))-----------")
            annonce.deleteAnnonce(req.body.id_ann,r)
            .then((r)=>
            {
                console.table(r)
                res.send({status :'success',data : r })
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
const get_demande =  router.post('/get_demande', function (req, res) {
    const annonce = new Annonce()
    const token = new Token()
    token.token(req.body.token).then((r) => {
        if(r !== -2)
        {
            annonce.get_demande(r)
            .then((r)=>
            {
                console.table(r)
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
module.exports = annonce
module.exports = demande
module.exports = getCat
module.exports = get_myAnn
module.exports = editAnnonce
module.exports = deleteAnnonce
module.exports = get_demande