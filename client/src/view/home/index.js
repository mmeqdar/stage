import React,{useEffect,useState} from 'react';
import axios from "axios";
import { ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import {  withStyles} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import { ToastContainer, toast } from 'react-toastify';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HighlightOffIcon from '@material-ui/icons/Close';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './home.css';
//var len= 0
var quan_acheter =0;
var produit={
    quan:null,
    cat:null,
    prix:null,
    phone:null,
    descri : null,
    len:0,
    id:null
}
var status = 'error'
var msg = null
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const NavBar = withStyles(theme => ({
    root: {
      backgroundColor: "#F6F6F6",
      color: "black"
    },
  }))(AppBar);
var tableau=[];


var getCategorie=[];

var search={
    cat:null
}
const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
 export default  function Home(props){
    axios.post('http://localhost:3001/check_token',{token:localStorage.getItem('token')}).then((r)=>{
        if(r.data.data == -2)
            props.history.push("/login") 
    })
    if(!props || !props.location || !props.location.state || !props.location.state.id_user )
        props.history.push('/map_ven')
    const [data, setData] = useState({ hits: [] });
    const [tn, setDatan] = useState({ n: false ,len:null});
    
   useEffect(() => {
    const fetchData = async () => {
      if(props && props.location && props.location.state && props.location.state.id_user )
        {const result = await axios.post('http://localhost:3001/get_myAnn',{id:props.location.state.id_user});
        if(localStorage.getItem('langue')  == 'ar')
        {
          for(var i = 0;i <result.data.length ;i++)
              { 
              if(result.data[i].name_categorie === "Pottery")
              result.data[i].name_categorie ="الفخار"
                    if(result.data[i].name_categorie === "Spices")
                    result.data[i].name_categorie = "التوابل"
                    if(result.data[i].name_categorie === "Textile")
                    result.data[i].name_categorie = "النسيج"
                    if(result.data[i].name_categorie === "Sewing and Embroidery")
                    result.data[i].name_categorie = "الخياطة والتطريز"
              }
        }
        if(localStorage.getItem('langue')  == 'fr')
        {
            for(var i = 0;i <result.data.length ;i++)
                { 
                    if(result.data[i].name_categorie === "Pottery")
                    result.data[i].name_categorie = "Poterie"
                    if(result.data[i].name_categorie === "Spices")
                    result.data[i].name_categorie = "Épices"
                    if(result.data[i].name_categorie === "Textile")
                    result.data[i].name_categorie = "Textile"
                    if(result.data[i].name_categorie === "Sewing and Embroidery")
                    result.data[i].name_categorie = "Couture et Broderie" 
                }
          }
        setData({hits:result.data});}
        };
    fetchData();
  }, []);
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleChangeQuantity = event =>
  { 
    quan_acheter = event.target.value
  };
const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  axios.post('http://localhost:3001/getCatergorie').then((r)=>
  {
      if(r.data)
      {
        if(localStorage.getItem('langue')  == 'en')
        {
          for(var i = 0;i <r.data.length ;i++)
          {
            getCategorie[i] = <MenuItem  key = {i} value = {r.data[i].id_categorie}> {r.data[i].name_categorie}</MenuItem>
          }
        }
        if(localStorage.getItem('langue')  == 'fr')
        {
            for(var i = 0;i <r.data.length ;i++)
                { 
                    if(r.data[i].name_categorie === "Pottery")
                        r.data[i].name_categorie = "Poterie"
                    if(r.data[i].name_categorie === "Spices")
                        r.data[i].name_categorie = "Épices"
                    if(r.data[i].name_categorie === "Textile")
                        r.data[i].name_categorie = "Textile"
                    if(r.data[i].name_categorie === "Sewing and Embroidery")
                    r.data[i].name_categorie = "Couture et Broderie" 
                    getCategorie[i] = <MenuItem  key = {i} value = {r.data[i].id_categorie}> {r.data[i].name_categorie}</MenuItem>
                }
        }
        if(localStorage.getItem('langue')  == 'ar')
        {
          for(var i = 0;i <r.data.length ;i++)
          { if(r.data[i].name_categorie === "Pottery")
                r.data[i].name_categorie ="الفخار"
            if(r.data[i].name_categorie === "Spices")
                r.data[i].name_categorie = "التوابل"
            if(r.data[i].name_categorie === "Textile")
                r.data[i].name_categorie = "النسيج"
            if(r.data[i].name_categorie === "Sewing and Embroidery")
                r.data[i].name_categorie = "الخياطة والتطريز"
                getCategorie[i] = <MenuItem  key = {i} value = {r.data[i].id_categorie}> {r.data[i].name_categorie}</MenuItem>
          }
        }
      }
  }) 
  const handleChangeCategory =(event)=>
  {
    search.cat = event.target.value
  }

  const recherche = ()=>
  {
      if(search.cat)
      {
        axios.post("http://localhost:3001/search",{category:search.cat,id:props.location.state.id_user})
        .then((r)=>{
            //tableau =r.data
            setData({hits:r.data});
        })
      }
  }
  const handleAddToCartFromView = ()=>
  {
    if(quan_acheter == 0)
      {
        msg =  t('annonce.ERR_QUANTITY')
        status = 'error'
         setOpen(true);
      }
  else 
    { 
      if(quan_acheter > produit.quan)
      {
        msg =  t('annonce.indispo')
        status = 'error'
         setOpen(true);
      }
      else
      {
        axios.post('http://localhost:3001/add_cart',{token:localStorage.getItem('token'),id:produit.id,quantite:quan_acheter})
        .then((r)=>{
          if(r.data.status === "success")
          {
              msg = t('home.done')
              status = 'success'
              setOpen(true);
          }
          else
          {
              msg =  t('home.'+r.data.data)
              status = 'error'
              setOpen(true);

          }
        })
      }
    }
  };
  const info=(id,q,p,c,ph,d)=>
  {
    produit.len = 0
    produit.cat = c;
    produit.quan = q;
    produit.prix = p;
    produit.phone = ph;
    produit.descri = d;
    produit.id = id
    axios.post("http://localhost:3001/get_ann",{id:id})
    .then((r)=>{
         tableau =r.data
         console.log(produit.len)
        if(tn.n === false)
         setDatan({n:true});
        else
         setDatan({n:false});
    })
    
     // n = true
  }
  const close =()=>
  {
    setDatan({n:false});
  }
  const next =()=>
  {
    produit.len++

    if(produit.len >= tableau.length)
    produit.len = 0;
   /* else
       produit.len++;*/
  }
  const prec =()=>
  {
    produit.len--;
      
    if(produit.len < 0)
       produit.len = tableau.length - 1;
       
  }
    return(
        <div>
            <div className="bar">
                <NavBar position="static">
                    <Box display="flex"  style={{padding: "1% 3% 1% 1%" }}>
                        <ThemeProvider theme={theme}>
                            <FormControl className="arsearch mt-2 col-1">
                                <SearchIcon onClick={recherche} fontSize="large" className="icon" />
                            </FormControl>
                            <FormControl variant="outlined"  className="formcateg col-5">
                                <InputLabel id="demo-simple-select-filled-label"> {t('home.CATEGO')}</InputLabel>
                                <Select
                                label ={t('home.CATEGO')}
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                onChange={handleChangeCategory}
                                >
                                    <MenuItem  disabled> {t('home.CATEGO')}</MenuItem>
                                    {getCategorie}
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                    </Box>
                </NavBar>
            </div>
            
            <Grid container justify="center" className="mt-4">
                {data.hits && data.hits.map((element,index)=>(
                    <React.Fragment key={index} >
                    <Card  className="card" onClick={()=>{info(element.id_annonce,element.quantity,element.prix,element.name_categorie,element.phone,element.description)}}>
                    <div className="container">
                        <img
                            className="media"
                            src={`http://localhost:3001/images/${element.name_images}`}
                        />
                        <div className="overlay" >
                            <div >
                                <Typography className="text">
                                    {element.quantity} {t('home.KG')}
                                </Typography>
                                <Typography className="text1">
                                {element.prix} {t('home.PRICE')}
                                </Typography>
                            </div>
                            <button className="buyButton"> {t('home.BUY')}</button>
                        </div>
                    </div>
                    </Card></React.Fragment>
                ))}          
            </Grid>
            {tn.n === true && tableau && <div className="modal  productQuickView show" style={{paddingRight: '16px', display: 'block'}}>
            <ToastContainer />
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" onClick={close} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><HighlightOffIcon/></span>
                        </button>
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6">
                                <div className="productQuickView-image imgs">
                                    <ArrowBackIosIcon className="prec" onClick={prec}/>
                                    <img src={`http://localhost:3001/images/${tableau[produit.len].name_images}`} alt="image" /> 
                                    <ArrowForwardIosIcon className="next" onClick={next}/>
                                </div>
                            </div>
                            <div className="col-lg-1 col-md-1">
                                <div className="vl"></div>
                            </div>
                            <div className="col-lg-5 col-md-5">
                                <div className="product-content">
                                    <h3>{produit.descri}</h3>
                                    <ul className="product-info">
                                        <li><span>{t('home.PRIX')}:</span>{produit.prix}{t('home.PRICE')} </li>
                                        <li><span>{t('home.QUAN')}:</span> {produit.quan}{t('home.KG')}</li>
                                        <li><span>{t('home.CAT')}:</span>{produit.cat}</li>
                                        <li><span>{t('home.PHO')}:</span>0{produit.phone}</li>
                                    </ul>
                                    <div className="row product-add-to-cart mt-5">
                                    <Grid item xs={5} className="col">
                                  <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    onChange={handleChangeQuantity}
                                    type="number"
                                    id="quantity"
                                    label={t('annonce.QUANTITY')}
                                    autoComplete="quantity"
                                    InputProps={{
                                      endAdornment: <InputAdornment position="end"></InputAdornment>,
                                    }}
                                   /* inputProps={{
                                      style: { textAlign: align },
                                    }}*/
                                  />
                              </Grid>
                                        <button 
                                            className="btn btn-primary col mt-2"
                                            onClick={handleAddToCartFromView}
                                        >
                                            <ShoppingCartIcon/> {t('home.ADD')}
                                        </button>
                                        
                                    </div>
                                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                                        <Alert onClose={handleClose}  severity={status}>
                                          {msg}
                                        </Alert>
                                    </Snackbar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}