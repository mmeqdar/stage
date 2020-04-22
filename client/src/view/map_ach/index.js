import React, { useState, useEffect } from "react";
import axios from "axios";
import {withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HighlightOffIcon from '@material-ui/icons/Close';
import './index.css';
import './map.css';
import mapStyles from "./mapStyles";
import shop from  "../../images/shop.png";
import ferme from  "../../images/icon.png";
import { TableSortLabel } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

var quan_acheter =0;
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

var lt = null;
var lg= null;
var tableauShow=[];
var lat,lng;
var status = 'error'
var msg = null
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 export default  function Map(props){
 /* axios.post('http://localhost:3001/check_token',{token:localStorage.getItem('token')}).then((r)=>{
    if(r.data.data == -2)
        props.history.push("/login") 
  });*/
  const { t } = useTranslation();
  const [data, setData] = useState({ hits: [] });
  axios.post('http://localhost:3001/check_type',{type:localStorage.getItem('type')}).then((r)=>{
        if(r.data.data !== 1)
        props.history.push('/map_ven')
  })
        useEffect(() => {
        const fetchData = async () => {
                const res = await axios.post('http://localhost:3001/all_user');
                setData({hits:res.data});
            };
        fetchData();
      }, []);
  const  Map = ()=> {
    
    function mp(pic)
    {
      var t = `http://localhost:3001/images/`+pic
      return (t)

    }
    return (
      <GoogleMap
      defaultZoom={5.5}
      defaultCenter={{ lat: 28.530768778345408, lng: -9.669413157291313 }}
      defaultOptions={{ styles: mapStyles }}
      >
        {data && data.hits.map((element,index)=>(
         <Marker
          key = {index}
          position={{
            lat:Number(element.lat), 
            lng: Number(element.lng)
          }}
          
          icon={{
            url:mp(element.profil),
            scaledSize: new window.google.maps.Size(30, 30)
          }}
          onClick={()=>{info(element.id_user,element.lat,element.lng,element.fullName,element.id_cf)}}
        /> 
      
        ))}
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
          <span className="fullname" onClick={()=>
          {
            props.history.push({
              pathname: '/',
              state: {id_user: infow.id}
            })
          }}>{infow.fullname}</span>
          <table className="table">
          {table.tableau && table.tableau.map((element,index)=>(<tr className="trInfo" onClick={()=>{show(element.id_annonce,element.quantity,element.prix,element.name_region,element.name_categorie,element.phone,element.description)}} key={index}>
            <td colspan="2" className="tdimginfo mr-3"><img className="imginfo" src ={`http://localhost:3001/images/${element.name_images}`}></img></td>
            <td><tr><td><span className="span ">{t('home.PRIX')}</span><br/> {element.prix}{t('home.PRICE')} </td>
                <td><span className="span">{t('home.QUAN')}</span> <br/>{element.quantity}{t('home.KG')}</td>
                <td><span className="span">{t('home.CAT')}</span><br/> {element.name_categorie}</td>
                </tr>
            </td>
          </tr>))}
          {table.tableau.length == 0 &&<tr><td>aucun produit</td></tr>}
          </table>
        </div>
      </InfoWindow>
        }
      </GoogleMap>
    );
  };
  const handleAddToCartFromView = ()=>
  {
    if(quan_acheter == 0)
      {
        msg =  t('annonce.ERR_QUANTITY')
         setOpen(true);
      }
    else 
    { 
      if(quan_acheter > produit.quan)
      {
        msg =  t('annonce.indispo')
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
  const [tn, setDatan] = useState({ n: false ,len:null});
  const [infow, setDatainfo] = useState({ infowin :false,lat:null,lng:null,fullname:null,id:null});
  const [table, setDatatableau] = useState({ tableau:[]});
  const [open, setOpen] = React.useState(false);
  const info=(id,lt,lg,name,id_cf)=>
  {
    console.log("hada : "+id)
    setDatainfo({infowin:true,lat:lt,lng:lg,fullname:name,id:id});
    axios.post("http://localhost:3001/get_all_ann",{id:id_cf})
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
    quan_acheter = 0
    setDatan({n:false});
  }
  const MapWrapped = withScriptjs(withGoogleMap(Map));

  /* axios.post('http://localhost:3001/check_token',{token:localStorage.getItem('token')}).then((r)=>{
        if(r.data.data == -2)
            props.history.push("/login") 
    });*/
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
    if(localStorage.getItem('langue') === 'ar') {
      return (
        <div className="map">
            <MapWrapped googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3&language=ar&libraries=places&key=AIzaSyAPmEexK0qohaFbERtXwsykYnjKhrcuATk`}
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
                                    <h3 className="ml-5">{produit.descri}</h3>
                                    <table className="product-info">
                                       <tr><td>{produit.prix}{t('home.PRICE')} </td><td><span className="span">:{t('home.PRIX')}</span></td></tr> 
                                       <tr> <td>{produit.quan}{t('home.KG')}</td><td><span className="span">:{t('home.QUAN')}</span> </td></tr> 
                                       <tr> <td>{produit.cat}</td><td><span className="span">:{t('home.CAT')}</span></td></tr> 
                                       <tr> <td>0{produit.phone}</td><td><span className="span">:{t('home.PHO')}</span></td></tr> 
                                    </table>
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
        
    )}
    else
    {
      return (
        <div className="map">
            <MapWrapped googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3&language=ar&libraries=places&key=AIzaSyAPmEexK0qohaFbERtXwsykYnjKhrcuATk`}
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
                                    <h3 className="ml-5">{produit.descri}</h3>
                                    <table className="product-info">
                                       <tr><td><span>{t('home.PRIX')}:</span></td><td>{produit.prix}{t('home.PRICE')} </td></tr> 
                                       <tr> <td><span>{t('home.QUAN')}:</span></td><td> {produit.quan}{t('home.KG')}</td></tr> 
                                       <tr> <td><span>{t('home.CAT')}:</span></td><td>{produit.cat}</td></tr> 
                                       <tr> <td><span>{t('home.PHO')}:</span></td><td>0{produit.phone}</td></tr> 
                                    </table>
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
}