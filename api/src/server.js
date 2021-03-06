const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');


//const config = require('config')
//const nodeMailer = require("nodemailer")
const register = require('./router/user.js')
const local = require('./router/user.js')
const login = require('./router/user.js')
const confirmation = require('./router/user.js')
const forgot = require('./router/user.js')
const forgot1 = require('./router/user.js')
const updatepswd = require('./router/user.js')
const getRegion = require('./router/user.js')
const getCatergorie = require('./router/user.js')
const search = require('./router/home.js')
const all = require('./router/home.js')
const get_ann = require('./router/home.js')
const annonce = require('./router/annonce.js')
const demande = require('./router/annonce.js')
const getCat= require('./router/annonce.js')
const check_token = require('./router/token.js')
const check_type = require('./router/token.js')
const get_info = require('./router/user.js')
const update = require('./router/user.js')
const update_pic = require('./router/user.js')
const editAnnonce = require('./router/annonce.js')
const get_myAnn= require('./router/annonce.js')
const deleteAnnonce= require('./router/annonce.js')
const all_user = require('./router/home.js')
const get_all_ann = require('./router/home.js')
const add_cart = require('./router/user.js')
const get_cart = require('./router/user.js')
const get_demande= require('./router/annonce.js')
const add_local = require('./router/user.js')
const get_local = require('./router/user.js')
const get_all_ann_CF = require('./router/home.js')
const get_coop = require('./router/user.js')
//const passport = require('passport')
const port = process.env.PORT || 3001

//----------users---------//


class Server{
    constructor()
    {
         
        this.app = express()
        //this.app.use(express.static('images'));
        this.app.use('/images', express.static('src/images/'))
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.http = http.Server(this.app)

        this.app.post('/register', register);
        this.app.post('/local', local);
        this.app.post('/login', login);
        this.app.post('/confirmation', confirmation);
        this.app.post('/forgot', forgot);
        this.app.post('/forgot1', forgot1);
        this.app.post('/updatepswd', updatepswd);
        this.app.post('/getRegion', getRegion);
        this.app.post('/getCatergorie', getCatergorie);
        this.app.post('/search', search);
        this.app.post('/all', all);
        this.app.post('/get_ann', get_ann);
        this.app.post('/annonce', annonce);
        this.app.post('/demande', demande);
        this.app.post('/getCat', getCat);
        this.app.post('/check_token', check_token);
        this.app.post('/check_type', check_type);
        this.app.post('/get_info', get_info);
        this.app.post('/update', update);
        this.app.post('/update_pic', update_pic);
        this.app.post('/get_myAnn', get_myAnn);
        this.app.post('/editAnnonce', editAnnonce);
        this.app.post('/deleteAnnonce', deleteAnnonce);
        this.app.post('/all_user', all_user);
        this.app.post('/get_all_ann', get_all_ann);
        this.app.post('/add_cart', add_cart);
        this.app.post('/get_cart', get_cart);
        this.app.post('/get_demande', get_demande);
        this.app.post('/add_local', add_local);
        this.app.post('/get_local', get_local);
        this.app.post('/get_all_ann_CF', get_all_ann_CF);
        this.app.post('/get_coop', get_coop);
        
     }
      listen() {
            this.http.listen(port, ()=> {
            console.log(`Listening on http://localhost:3001`)
          })
        }
   }
   const server = new Server()
   server.listen()


