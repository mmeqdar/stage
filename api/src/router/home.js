const express = require('express');
const router = express.Router();
const Home = require('../models/m_home');
const { ERRORS } = require('../../config/const').RESPONSES;

const search =  router.post('/search', function (req, res) {
    const home = new Home()
    home.search(req.body.category,req.body.id)
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
    home.all(req.body.type)
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
const all_user =  router.post('/all_user', function (req, res) {
    const home = new Home()
    home.all_user()
    .then((r)=>
    {
        res.send(r)
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
const get_all_ann =  router.post('/get_all_ann', function (req, res) {
    const home = new Home()
    home.get_all_ann(req.body.id)
    .then((r)=>
    {
        console.table(r)
        res.send(r)
    })
    .catch((err)=>{
        res.send({status :'failure',data :"GENERAL"})
    })
});
const get_all_ann_CF =  router.post('/get_all_ann_CF', function (req, res) {
    const home = new Home()
    home.get_all_ann_CF(req.body.id)
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
module.exports = get_ann;
module.exports = all_user;
module.exports = get_all_ann;
module.exports = get_all_ann_CF;