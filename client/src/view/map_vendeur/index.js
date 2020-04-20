import React, { useState, useEffect } from "react";
import axios from "axios";
import {withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HighlightOffIcon from '@material-ui/icons/Close';
import './index.css';
import './modal.css';
import mapStyles from "./mapStyles";
import shop from  "../../images/shop.png";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { TableSortLabel } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { green} from '@material-ui/core/colors';
import { makeStyles, withStyles , ThemeProvider , createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {useDropzone} from 'react-dropzone';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';

var produit={
  region:null,
  quan:null,
  cat:null,
  prix:null,
  phone:null,
  descri : null,
  len:0,
  id:null
}
var annonce_cf  = false
var lt = null;
var lg= null;
var tableauShow=[];
var lat,lng;
var align = 'left'
var msg = null
var data_cate = []
var id_category = null
var quantity = null
var description = null
var prix = null
var status = 'error'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

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

const useStyles = makeStyles(theme => ({
paper: {
  marginTop: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
},
form: {
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(3),
  
},
submit: {
  margin: theme.spacing(3, 0, 2),
  
},
formControl: {
  margin: theme.spacing(1),
  width: '100%',
},

h1: {
  padding: "5px", 
  backgroundColor: green[500],
  width: "150%", 
  textAlign:"center",
  color: 'white'
},
addPic: {
  width: '100%',
  height: "100px",
  marginTop: '2%',
  border: 'ridge',
}
}));

//-----------Style Drag & Drop ------------
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


 export default  function Map(props){

  axios.post('http://localhost:3001/check_token',{token:localStorage.getItem('token')}).then((r)=>{
    if(r.data.data == -2)
        props.history.push("/login") 
    else
    {
       axios.post('http://localhost:3001/get_info',{token:localStorage.getItem('token')}).then((r)=>{
        if(r.data && r.data[0] &&r.data[0].lat && r.data[0].lng)
        {
          lat = r.data[0].lat
          lng = r.data[0].lng

        }
      })
    }
  });
  axios.post('http://localhost:3001/check_type',{type:localStorage.getItem('type')}).then((r)=>{
    if(r.data.data === 1)
    props.history.push('/map')
  })

  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const handleChangeCategory = event => {
    setCategory(event.target.value);
    id_category = event.target.value
  };
  const handleChangePrix = event =>
    { 
        prix = event.target.value
    };
    const handleChangeQuantity = event =>
    { 
        quantity = event.target.value
    };
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
                const v = description.replace(description[i],"")
                event.target.value = v
            }
        }
    };
  /*------------------------files---------------*/ 
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt="images"
          />
        </div>
      </div>
    ));
    /*---------------------------------------*/
  const classes = useStyles();
  const { t } = useTranslation();
  const [data, setData] = useState({ hits: [] });
  axios.post('http://localhost:3001/check_type',{type:localStorage.getItem('type')}).then((r)=>{
    //------------- check type
  })
        useEffect(() => {
        const fetchData = async () => {
            const result = await axios.post('http://localhost:3001/get_local',{token:localStorage.getItem('token')});
            setData({hits:result.data});
            };
        fetchData();
      }, []);
     
      const add_marker =(e)=>
       { 
        if (window.confirm(t('home.ADD_LOC')+e.latLng+'?'))
        {
          axios.post('http://localhost:3001/add_local',{token:localStorage.getItem('token'),token:localStorage.getItem('token'),lat:e.latLng.lat(),lng:e.latLng.lng()})
          .then(()=>
          {
            axios.post('http://localhost:3001/get_local',{token:localStorage.getItem('token')})
            .then((r)=>
            {
              setData({hits:r.data});
            })
          })
        }
      }
   
  const  Map = ()=> {
    return (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: 28.530768778345408, lng: -9.669413157291313 }}
        defaultOptions={{ styles: mapStyles }}
        onClick={(e)=>{add_marker(e)}}
      >
        <Marker
          position={{
            lat:Number(lat), 
            lng: Number(lng)
          }}
        />
        {data && data.hits.map((element,index)=>(
          <Marker
          key = {index}
          position={{
            lat:Number(element.lat), 
            lng: Number(element.lng)
          }}
          
          icon={{
            url:shop,
            scaledSize: new window.google.maps.Size(50, 50)
          }}
          onClick={()=>{info(element.id_cf,element.lat,element.lng)}}
        />))}
       {infow.infowin&&<InfoWindow
        position={{
          lat:Number(infow.lat), 
            lng: Number(infow.lng)
        }}
        options={{
          boxStyle: {
            width: '30vw'
          },
      }}
      >
        <div className="divShow" >
          <table className="table">
          {table.tableau && table.tableau.map((element,index)=>(<tr className="trInfo"  key={index}>
            <td colspan="2" onClick={()=>{show(element.id_annonce,element.quantity,element.prix,element.name_region,element.name_categorie,element.phone,element.description)}} className="tdimginfo mr-3"><img className="imginfo" src ={`http://localhost:3001/images/${element.name_images}`}></img></td>
            <td onClick={()=>{show(element.id_annonce,element.quantity,element.prix,element.name_region,element.name_categorie,element.phone,element.description)}}><span className="span">{t('home.PRIX')} :</span> {element.prix}{t('home.PRICE')} <br/>
                <span className="span">{t('home.QUAN')} :</span> {element.quantity}{t('home.KG')}<br/>
                <span className="span">{t('home.CAT')} :</span> {element.name_categorie}<br/>
            </td>
            <td><DeleteIcon className="deletButton" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) del(element.id_annonce)}}/>
            </td>
          </tr>))}
          {table.tableau.length == 0 &&<tr><td>aucun produit</td></tr>}
          </table>
          <AddCircleIcon fontSize="large" className="add_icon" onClick={()=>{
          
             setDatan({n2:true});
          }} />
        </div>
      </InfoWindow>
        }
      </GoogleMap>
    );
  };
  const handleAddToCartFromView = ()=>
  {
    axios.post('http://localhost:3001/add_cart',{token:localStorage.getItem('token'),id:produit.id})
    .then(()=>{

    })
  };
  const [tn, setDatan] = useState({ n: false ,n2:false});
  const [infow, setDatainfo] = useState({ infowin :false,lat:null,lng:null,id_cf:null,open:false});
  const [table, setDatatableau] = useState({ tableau:[]});
  const info=(id,lt,lg)=>
  {
    setDatainfo({infowin:true,lat:lt,lng:lg,id_cf:id});
    axios.post("http://localhost:3001/get_all_ann_CF",{id:id})
    .then((r)=>{
      console.table(r.data)
      if(localStorage.getItem('langue')  == 'ar')
        {
          for(var i = 0;i <r.data.length ;i++)
              { 
              if(r.data[i].name_categorie === "Pottery")
                        r.data[i].name_categorie ="الفخار"
                    if(r.data[i].name_categorie === "Spices")
                        r.data[i].name_categorie = "التوابل"
                    if(r.data[i].name_categorie === "Textile")
                        r.data[i].name_categorie = "النسيج"
                    if(r.data[i].name_categorie === "Sewing and Embroidery")
                        r.data[i].name_categorie = "الخياطة والتطريز"
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
                }
          }
      setDatatableau({tableau:r.data});
    })
  };
  /*const add_produit =((id)=>
  {
   
  });*/
  const show=(id,q,p,r,c,ph,d)=>
  {
    produit.len = 0
    produit.region = r;
    produit.cat = c;
    produit.quan = q;
    produit.prix = p;
    produit.phone = ph;
    produit.descri = d
    produit.id = id
    
    axios.post("http://localhost:3001/get_ann",{id:id})
    .then((r)=>{
         tableauShow =r.data
         //len = tableau.length
         console.log(produit.len)
         //len = tableau.lenght;
        if(tn.n === false)
         setDatan({n:true});
        else
         setDatan({n:false});
    })
    
     // n = true
  }
  const close =()=>
  {
    setDatainfo({infowin:false})
    setDatan({n:false});
     id_category = null
 quantity = null
 description = null
   prix = null 
   setCategory(null)
   setFiles([])

  }
  const MapWrapped = withScriptjs(withGoogleMap(Map));

   axios.post('http://localhost:3001/check_token',{token:localStorage.getItem('token')}).then((r)=>{
        if(r.data.data == -2)
            props.history.push("/login") 
    })
    //----------------getCategory---------------
    axios.post('http://localhost:3001/getCat').then((r)=>
    {
        if(r.data)
        {
            if(localStorage.getItem('langue')  === 'en')
            {
                for(var i = 0;i <r.data.length ;i++)
                {
                  data_cate[i] = <MenuItem  key = {i} value = {r.data[i].id_categorie}> {r.data[i].name_categorie}</MenuItem>
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
                        data_cate[i] = <MenuItem  key = {i} value = {r.data[i].id_categorie}> {r.data[i].name_categorie}</MenuItem>
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
                        data_cate[i] = <MenuItem  key = {i} value = {r.data[i].id_categorie}> {r.data[i].name_categorie}</MenuItem>
                }
            }
        }
    })
    //----------------Add Annonce---------------
    const annonce =()=>{ 
      const data = new FormData();
      if(id_category == null)
      {
          msg = t('annonce.ERR_CATEGORY')
          setOpen(true);
      }
      else if(quantity <= 0)
      {
          msg =  t('annonce.ERR_QUANTITY')
          setOpen(true);
      }
      else if(description == null)
      {
          msg =  t('annonce.ERR_DESCRIPTION')
          setOpen(true);
      }
      else if(prix <= 0)
      {
          msg =  t('annonce.ERR_PRICE')
          setOpen(true);
      }
      else if(files.length == 0)
      {
          msg =  t('annonce.ERR_IMAGE')
          setOpen(true);
      }
      else
      {
          for (const key of Object.keys(files)) {
              console.log(files[key])
              data.append('pic', files[key])
          }
          data.append('category', id_category)
          data.append('prix', prix)
          data.append('desc', description)
          data.append('quantity', quantity)
          data.append('token', localStorage.getItem('token'))
          data.append('id_cf',infow.id_cf)
          const con = { headers: { 'Content-Type': 'multipart/form-data; boundary=something' } }
          axios.post('http://localhost:3001/annonce',data,con)
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
                  msg =  t('annonce'+r.data.data)
                  status = 'error'
                  setOpen(true);
              }
          })
      }  
  }
  /*---------------delete-------*/

  const del = (id)=>{
    const data ={id_ann:id,token:localStorage.getItem('token')}
    axios.post('http://localhost:3001/deleteAnnonce',data)
    .then((r)=>
    {
      if(r.data.status === "success")
      {
        setDatainfo({infowin:false})
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
    return(
        <div className="map">
            <MapWrapped googleMapURL={`https://maps.googleapis.com/maps/api/js?v=2&language=ar&libraries=places&key=AIzaSyAPmEexK0qohaFbERtXwsykYnjKhrcuATk`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      {tn.n === true && tableauShow && <div className="modal  productQuickView show" style={{paddingRight: '16px', display: 'block'}}>
            <ToastContainer />
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" onClick={close} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><HighlightOffIcon/></span>
                        </button>
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6">
                                <div className="productQuickView-image imgs">
                                    <img src={`http://localhost:3001/images/${tableauShow[produit.len].name_images}`} alt="image" /> 
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
                                    <div className="product-add-to-cart mt-5">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary"
                                            onClick={handleAddToCartFromView}
                                        >
                                            <ShoppingCartIcon/> {t('home.ADD')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
           
            {tn.n2 === true && <div className="modal  productQuickView show" style={{paddingRight: '160px', display: 'block'}}>
            <ToastContainer />
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" onClick={close} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><HighlightOffIcon/></span>
                        </button>
                        <div className="row align-items-center">
                        <form className={classes.form}  noValidate>
                        <Grid container spacing={2}>
                        <ThemeProvider theme={theme}>
                        <FormControl variant="outlined"  className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">{t('annonce.CATEGORY')}*</InputLabel>
                        <Select
                          label={t('annonce.CATEGORY')}
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={category}
                          onChange={handleChangeCategory}
                        >
                          {data_cate}
                        </Select>
                          </FormControl>
                          <Grid item xs={12}>
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
                            inputProps={{
                              style: { textAlign: align },
                            }}
                          />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          onChange={handleChangeDesc}
                          label={t('annonce.DESCRIPTION')}
                          id="text"
                          multiline
                          rows={4}
                          inputProps={{
                              style: { textAlign: align },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          onChange={handleChangePrix}
                          label={t('annonce.PRICE')}
                          id="prix"
                          type="number"
                          InputProps={{
                              endAdornment: <InputAdornment position="end">{t('home.PRICE')} </InputAdornment>,
                          }}
                          inputProps={{
                              style: { textAlign: align },
                          }}
                        />
                      </Grid>
                      <section >
                      <div {...getRootProps()} style={{marginTop: "2%" , marginLeft: "30%", marginRight:"30%" ,  textAlign: "center", border: "dashed", borderColor: green[500]}}>
                      <input {...getInputProps()} />
                      <AddAPhotoOutlinedIcon  style={{ fontSize: 60, color: green[500] }}/>
                      </div>
                      <aside style={thumbsContainer}>
                          {thumbs}
                      </aside>
                     </section>
                     <ColorButton
                      fullWidth
                      variant="outlined"
                      color="primary"
                      className={classes.submit}
                      onClick={annonce}
                    >
                      {t('annonce.BTN')}
                  </ColorButton>
                  <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                      <Alert onClose={handleClose}  severity={status}>
                         {msg}
                      </Alert>
                  </Snackbar>
                        </ThemeProvider>
                        </Grid>

                        </form>
                </div>
                </div>
                </div>
                </div>
            }
        </div>
        
    )
}