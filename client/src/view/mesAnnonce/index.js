import React,{useEffect,useState} from 'react';
import axios from "axios";
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles, makeStyles , ThemeProvider ,} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ColorButton = withStyles(theme => ({
  root: {
      color: green[800],
      borderColor: green[800],
      '&:hover': {
      backgroundColor: green[500],
      color: "white",
      borderColor: green[500],
      },
  },
  }))(Button);

var msg = null
var status = 'error'
var align = 'left'
var quantity = null
var description = null
var price = null

var produit={
    prix: null,
    quan: null,
    descri: null,
    id_ann: null,
    len:0
}
const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
var tableau=[];
const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    },
    btn: {
      color: 'black',
      textDecoration: 'none',
      '&:hover': {
        color: green[700],
        backgroundColor: "#F6F6F6",
      }
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    navbarLinkActive: {
      color: green[800],
      borderColor: green[700],
      border: "solid",
      borderRightWidth: "2px",
      borderRadius: "10px",
      borderLeftWidth: "2px",
    
    },
    image: {
      width: '80px',
    },
    pic:{
      margin:'0px',
      padding:'0px',
      width: '40px',
      height:'30px',
      borderRadius: "50%",
    },
    img123: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '200px',
      height: '200px',
  },
  spacing: {
    margin: theme.spacing(4, 0, 4),
  }
  }));
 export default  function Home(props){
    const classes = useStyles();
    axios.post('http://localhost:3001/check_token',{token:localStorage.getItem('token')}).then((r)=>{
        if(r.data.data == -2)
           props.history.push("/login") 

    })
    const [data, setData] = useState({ hits: [] });
    const [tn, setDatan] = useState({ n: false ,len:null});
    
    const fetchData = async () => {
      const result = await axios.post('http://localhost:3001/get_myAnn',{token:localStorage.getItem('token')});
      setData({hits:result.data});
    };
   useEffect(() => {
        fetchData();
    }, []);

  const { t } = useTranslation();
  //------------------categ----------
  if(localStorage.getItem('langue')  === 'ar')
  {
    if(produit.cat === "fruits")
      produit.cat="الفاكهة"
    if(produit.cat=== "vegetables")
      produit.cat = "الخضروات"
    if(produit.cat=== "cereal")
      produit.cat = "الحبوب"
  }
  else if(localStorage.getItem('langue')  === 'fr')
  {
    if(produit.cat === "fruits")
      produit.cat = "fruits"
    if(produit.cat === "vegetables")
      produit.cat = "légumes"
    if(produit.cat === "cereal")
      produit.cat = "céréale" 
  }
  //------------------align----------
  if(localStorage.getItem('langue')  === 'ar')
    {
        align = 'right'
    }
    else
    {
        align = 'left'
    }

  const close =()=>
  {
    fetchData();
    setDatan({n:false});
  }
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleChangeDesc = event =>
  { 
      description = event.target.value
      for(var i = 0 ; i < description.length; i++)
      {
          if(description.length > 200)
          {
              const v = description.replace(description.descri[i],"")
              event.target.value = v
          }
      }
  };

  const handleChangePrix = event =>
  { 
    price = event.target.value
  };

  const handleChangeQuantity = event =>
  { 
    quantity = event.target.value
  };
  //----------------Edit Annonce---------------
  const edit =()=>{ 
    if(quantity == null)
    {
      quantity = produit.quan
    }
    else if(quantity < 0)
    {
        msg =  t('annonce.ERR_QUANTITY')
        setOpen(true);
    }
    else if(description == null)
    {
      description = produit.descri
    }
    else if(price == null)
    {
      price = produit.prix
    }
    else if(price < 0)
    {
        msg =  t('annonce.ERR_PRICE')
        setOpen(true);
    }
    else
    {
      const data ={id_ann:produit.id_ann,prix:price,desc:description,quantity:quantity,token:localStorage.getItem('token')}
        axios.post('http://localhost:3001/editAnnonce',data)
        .then((r)=>
        {
            console.log(r.data.status)
            if(r.data.status === "success")
            {
                msg = t('annonce.ANN_SUCCESS')
                status = 'success'
                setOpen(true);
            }
            else
            {
                msg =  t('annonce.'+r.data.data)
                status = 'error'
                setOpen(true);

            }
        })
    }  
  }
  //----------------Delete Annonce---------------
  const del = (id)=>{
    const data ={id_ann:id,token:localStorage.getItem('token')}
    axios.post('http://localhost:3001/deleteAnnonce',data)
    .then((r)=>
    {
      if(r.data.status === "success")
      {
          fetchData();
          msg = t('annonce.ANN_SUCCESS')
          status = 'success'
          setOpen(true);
      }
      else
      {
          msg =  t('annonce.'+r.data.data)
          status = 'error'
          setOpen(true);

      }
    })
  }
//----------
  const info=(id,q,p,c,d)=>
  {
    produit.len = 0
    produit.cat = c;
    produit.quan = q;
    produit.prix = p;
    produit.descri = d
    produit.id_ann = id
    console.table(produit)
    axios.post("http://localhost:3001/get_ann",{id:produit.id_ann})
    .then((r)=>{
         tableau = r.data
         console.log(produit.len)
        if(tn.n === false)
         setDatan({n:true});
        else
         setDatan({n:false});
    })
  }

  return(
    <div>
        <Grid container justify="center" className="mt-4">
            {data.hits && data.hits.map((element,index)=>(
                <React.Fragment key={index} >
                <Card  className="card">
                    <div className="container">
                        <img
                            className="v"
                            src={`http://localhost:3001/images/${element.name_images}`}
                        />
                        <div className="overlay" >
                            <div >
                                <DeleteIcon className="deletButton" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) del(element.id_annonce)}}/>
                                <Typography className="text">
                                    {element.quantity} {t('home.KG')}
                                </Typography>
                                <Typography className="text1">
                                    {element.prix} {t('home.PRICE')}
                                </Typography>
                            </div>
                            <button className="buyButton" onClick={()=>{info(element.id_annonce,element.quantity,element.prix,element.name_categorie,element.description)}}>{t('annonce.B')}</button>
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
                                <img src={`http://localhost:3001/images/${tableau[produit.len].name_images}`} alt="image" /> 
                            </div>
                        </div>
                        <div className="col-lg-1 col-md-1">
                            <div className="vl"></div>
                        </div>
                        <div className="col-lg-5 col-md-5">
                            <div className="product-content">
                            <Grid container spacing={2}>
                                <ThemeProvider theme={theme}>
                                    <Grid item xs={12}>
                                      <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="cat"
                                        value={produit.cat}
                                        label={t('annonce.CATEGORY')}
                                        autoComplete="category"
                                        inputProps={{
                                          style: { textAlign: align },
                                        }}
                                        disabled
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <TextField
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChangeQuantity}
                                        type="number"
                                        id="quantity"
                                        placeholder={produit.quan}
                                        label={t('annonce.QUANTITY')}
                                        autoComplete="quantity"
                                        InputProps={{
                                          startAdornment: <InputAdornment position="start">{' '}</InputAdornment>,
                                          endAdornment: <InputAdornment position="end">KG</InputAdornment>,
                                        }}
                                        inputProps={{
                                          style: { textAlign: align },
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <TextField
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChangeDesc}
                                        label={t('annonce.DESCRIPTION')}
                                        placeholder={produit.descri}
                                        id="text"
                                        multiline
                                        rows={4}
                                        InputProps={{
                                          startAdornment: <InputAdornment position="start">{' '}</InputAdornment>,
                                        }}
                                        inputProps={{
                                            style: { textAlign: align },
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <TextField
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChangePrix}
                                        label={t('annonce.PRICE')}
                                        placeholder={produit.prix}
                                        id="prix"
                                        type="number"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">DH</InputAdornment>,
                                            startAdornment: <InputAdornment position="start">{' '}</InputAdornment>,
                                        }}
                                        inputProps={{
                                            style: { textAlign: align },
                                        }}
                                      />
                                    </Grid>
                                    <ColorButton
                                      fullWidth
                                      variant="outlined"
                                      color="primary"
                                      className={classes.submit}
                                      onClick={() => { edit();}}
                                    >
                                      {t('annonce.BUTTN')}
                                  </ColorButton>
                                </ThemeProvider>
                            </Grid>
                            </div>
                        </div>
                    </div>
                </div>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose}  severity={status}>
                      {msg}
                    </Alert>
                </Snackbar>
            </div>
        </div>}
    </div>
    )
}