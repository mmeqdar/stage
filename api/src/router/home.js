const express = require('express');
const router = express.Router();
const Home = require('../models/m_home');
const { ERRORS } = require('../../config/const').RESPONSES;

const search =  router.post('/search', function (req, res) {
    const home = new Home()
    home.search(req.body.region,req.body.category)
    .then((r)=>
    {
        console.table(r)
        res.send(r)
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
const all =  router.post('/all', function (req, res) {
    const home = new Home()
    home.all()
    .then((r)=>
    {
        res.send(r)
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
const get_ann =  router.post('/get_ann', function (req, res) {
    const home = new Home()
    home.get_ann(req.body.id)
    .then((r)=>
    {
        console.table(r)
        res.send(r)
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
module.exports = search;
module.exports = all;
module.exports=get_ann;