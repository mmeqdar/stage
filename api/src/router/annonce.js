const express = require('express');
const router = express.Router();
const Annonce = require('../models/m_annonce');
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
  const annonce = router.post('/annonce', upload.array('pic',6),async (req, res) => {
    var id_annonce
    const annonce = new Annonce()
    console.log(req.body.quantity)
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
        annonce.annonce(req.body.desc, req.body.quantity, req.body.prix, req.body.category)
        .then((r)=>
        {
            id_annonce = r.insertId 
            for(var i = 0; i < req.files.length; i++)
            {
                annonce.pic(req.files[i].filename,id_annonce,i)
                .then(()=>
                {
                    //res.send(r)
                })
                /*.catch((err)=>{
                    res.send({status :'failure',data :"GENERAL"})
                })*/
            }
            res.send({status :'success',data : r })
        })
        .catch((err)=>{
            res.send({status :'failure',data :"GENERAL"})
        })
    }
    
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

module.exports = annonce
module.exports = getCat