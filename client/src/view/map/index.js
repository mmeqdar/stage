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
import { TableSortLabel } from "@material-ui/core";

var type =null;
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
  const { t } = useTranslation();
  const [data, setData] = useState({ hits: [] });
  axios.post('http://localhost:3001/check_type',{type:localStorage.getItem('type')}).then((r)=>{
        type = r.data.data
  })
        useEffect(() => {
        const fetchData = async () => {
            const result = await axios.post('http://localhost:3001/check_type',{type:localStorage.getItem('type')});

            if(result.data.data === 0)
               {
                 
                const res = await axios.post('http://localhost:3001/all_user',{type:1});
                setData({hits:res.data});
               }
               else
               {
                
                 const res = await axios.post('http://localhost:3001/all_user',{type:0});
                 setData({hits:res.data});
                }
            
           
            };
        fetchData();
      }, []);
  const  Map = ()=> {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: Number(lat), lng:Number(lng) }}
        defaultOptions={{ styles: mapStyles }}
        
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
          onClick={()=>{info(element.id_user,element.lat,element.lng)}}
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
          {table.tableau && table.tableau.map((element,index)=>(<tr className="trInfo" onClick={()=>{show(element.id_annonce,element.quantity,element.prix,element.name_region,element.name_categorie,element.phone,element.description)}} key={index}>
            <td colspan="2" className="tdimginfo mr-3"><img className="imginfo" src ={`http://localhost:3001/images/${element.name_images}`}></img></td>
            <td><span className="span">{t('home.PRIX')} :</span> {element.prix}{t('home.PRICE')} <br/>
                <span className="span">{t('home.QUAN')} :</span> {element.quantity}{t('home.KG')}<br/>
                <span className="span">{t('home.CAT')} :</span> {element.name_categorie}<br/>
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
    axios.post('http://localhost:3001/add_cart',{token:localStorage.getItem('token'),id:produit.id})
    .then(()=>{

    })
  };
  const [tn, setDatan] = useState({ n: false ,len:null});
  const [infow, setDatainfo] = useState({ infowin :false,lat,lng});
  const [table, setDatatableau] = useState({ tableau:[]});
  const info=(id,lt,lg)=>
  {
    setDatainfo({infowin:true,lat:lt,lng:lg});
    axios.post("http://localhost:3001/get_all_ann",{id:id})
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
    setDatan({n:false});
  }
  const MapWrapped = withScriptjs(withGoogleMap(Map));

   axios.post('http://localhost:3001/check_token',{token:localStorage.getItem('token')}).then((r)=>{
        if(r.data.data == -2)
            props.history.push("/login") 
    })
    return(
        <div className="map">
            <MapWrapped googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing&key=AIzaSyAPmEexK0qohaFbERtXwsykYnjKhrcuATk`}
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
        </div>
        
    )
}