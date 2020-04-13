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
import Carousel from 'react-bootstrap/Carousel'
import img_1 from  "../../images/1.jpg"
import img_2 from  "../../images/2.jpg"
import img_3 from  "../../images/3.jpg"
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './home.css';
//var len= 0
var produit={
    region:null,
    quan:null,
    cat:null,
    prix:null,
    phone:null,
    descri : null,
    len:0
}
const NavBar = withStyles(theme => ({
    root: {
      backgroundColor: "#F6F6F6",
      color: "black"
    },
  }))(AppBar);
var tableau=[];

var getRegion =[], getCategorie=[];
var search={
    cat:null,
    reg:null
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
    axios.post('http://localhost:3001/check_type',{type:localStorage.getItem('type')}).then((r)=>{
        if(r.data.data == 1)
            props.history.push("/") 
    })
    const [data, setData] = useState({ hits: [] });
    //const [datas, setDatas] = useState({ hitss: [] });
    const [tn, setDatan] = useState({ n: false ,len:null});
    
   useEffect(() => {
    const fetchData = async () => {
        const result = await axios.post('http://localhost:3001/all',{type:1});
        setData({hits:result.data});
        };
    fetchData();
  }, []);
  const { t } = useTranslation();
  axios.post('http://localhost:3001/getRegion').then((r)=>
  {
      if(r.data)
      {
        if(localStorage.getItem('langue')  !== 'ar')
        {
          for(var i = 0;i <r.data.length ;i++)
          {
            getRegion[i] = <MenuItem  key = {i} value = {r.data[i].id_region}> {r.data[i].name_region}</MenuItem>
          }
        }
        else
        {
          for(var i = 0;i <r.data.length ;i++)
          { if(r.data[i].name_region === "Tanger-Tétouan-Al Hoceïma")
                r.data[i].name_region = "طنجة-تطوان-الحسيمة"
            if(r.data[i].name_region === "l'Oriental")
                r.data[i].name_region = "الشرق"
            if(r.data[i].name_region === "Fès-Meknès")
                r.data[i].name_region = "فاس-مكناس"
            if(r.data[i].name_region === "Rabat-Salé-Kénitra")
                r.data[i].name_region = " الرباط-سلا-القنيطرة"
            if(r.data[i].name_region === "Béni Mellal-Khénifra")
                r.data[i].name_region = " بني ملال-خنيفرة"
            if(r.data[i].name_region === "Casablanca-Settat")
                r.data[i].name_region = "الدار البيضاء-سطات"
            if(r.data[i].name_region === "Marrakech-Safi")
                r.data[i].name_region = "مراكش-آسفي"
            if(r.data[i].name_region === "Drâa-Tafilalet")
                r.data[i].name_region = "درعة-تافيلالت"
            if(r.data[i].name_region === "Souss-Massa")
                r.data[i].name_region = "سوس-ماسة"
            if(r.data[i].name_region === "Guelmim-Oued Noun")
                r.data[i].name_region = "كلميم-واد نون"
            if(r.data[i].name_region === "Laâyoune-Sakia El Hamra")
                r.data[i].name_region = " العيون-الساقية الحمراء" 
            if(r.data[i].name_region === "Dakhla-Oued Ed Dahab")
                r.data[i].name_region = "الداخلة-وادي الذهب"
                getRegion[i] = <MenuItem  key = {i} value = {r.data[i].id_region}> {r.data[i].name_region}</MenuItem>
          }
        }
      }
  });
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
                    if(r.data[i].name_categorie === "fruits")
                        r.data[i].name_categorie = "fruits"
                    if(r.data[i].name_categorie === "vegetables")
                        r.data[i].name_categorie = "légumes"
                    if(r.data[i].name_categorie === "cereal")
                        r.data[i].name_categorie = "céréale" 
                    getCategorie[i] = <MenuItem  key = {i} value = {r.data[i].id_categorie}> {r.data[i].name_categorie}</MenuItem>
                }
        }
        if(localStorage.getItem('langue')  == 'ar')
        {
          for(var i = 0;i <r.data.length ;i++)
          { if(r.data[i].name_categorie === "fruits")
                r.data[i].name_categorie ="الفاكهة"
            if(r.data[i].name_categorie === "vegetables")
                r.data[i].name_categorie = "الخضروات"
            if(r.data[i].name_categorie === "cereal")
                r.data[i].name_categorie = "الحبوب"
                getCategorie[i] = <MenuItem  key = {i} value = {r.data[i].id_categorie}> {r.data[i].name_categorie}</MenuItem>
          }
        }
      }
  }) 
  const handleChangeCategory =(event)=>
  {
    search.cat = event.target.value
  }
  const handleChangeRegion =(event)=>
  {
    search.reg = event.target.value
  }
  const recherche = ()=>
  {
      if(search.reg || search.cat)
      {
        axios.post("http://localhost:3001/search",{region:search.reg,category:search.cat,type:1})
        .then((r)=>{
            //tableau =r.data
            setData({hits:r.data});
        })
      }
  }
  const info=(id,q,p,r,c,ph,d)=>
  {
    produit.len = 0
    produit.region = r;
    produit.cat = c;
    produit.quan = q;
    produit.prix = p;
    produit.phone = ph;
    produit.descri = d
    axios.post("http://localhost:3001/get_ann",{id:id})
    .then((r)=>{
         tableau =r.data
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
            <Carousel >
                <Carousel.Item style={{height: "400px"}} className="car">
                    <img
                    className="d-block w-100 h-100"
                    src={img_1}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                        <h1 style={{fontSize: "500%"}}>First slide label</h1>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{height: "400px"}} className="car">
                    <img
                    className="d-block w-100 h-100"
                    src={img_2}
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h1 style={{fontSize: "500%"}}>Second slide label</h1>
                    </Carousel.Caption>
                </Carousel.Item >
                <Carousel.Item style={{height: "400px" }} className="car">
                    <img
                    className="d-block w-100 h-100"
                    src={img_3}
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h1 style={{fontSize: "500%"}}>Third slide label</h1>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
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
                            <FormControl variant="outlined"  className="formregion col-5">
                                <InputLabel id="demo-simple-select-filled-label">{t('home.REGION')}</InputLabel>
                                <Select
                                label ={t('home.REGION')}
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                onChange={handleChangeRegion}
                                >
                                    <MenuItem disabled> {t('home.REGION')}</MenuItem>
                                    {getRegion}
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                    </Box>
                </NavBar>
            </div>
            
            <Grid container justify="center" className="mt-4">
                {data.hits && data.hits.map((element,index)=>(
                    <React.Fragment key={index} >
                    <Card  className="card" onClick={()=>{info(element.id_annonce,element.quantity,element.prix,element.name_region,element.name_categorie,element.phone,element.description)}}>
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
                                    <div className="product-add-to-cart mt-5">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary"
                                            //onClick={this.handleAddToCartFromView}
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