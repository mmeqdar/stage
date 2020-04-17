import React, {useEffect, useState}  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
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
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useDropzone} from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import './index.css';

var msg = null
var status = 'error'
var data = []
var id_category = null
var quantity = null
var description = null
var prix = null
var align = 'left'

 

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

export default function Annonce(props) {
    axios.post('http://localhost:3001/check_token',{token:localStorage.getItem('token')}).then((r)=>{
        if(r.data.data == -2)
            props.history.push("/login") 
    })
    axios.post('http://localhost:3001/check_type',{type:localStorage.getItem('type')}).then((r)=>{
        if(r.data.data == 1)
            props.history.push("/demande")
        
    })
    const { t } = useTranslation();
    if(localStorage.getItem('langue')  === 'ar')
    {
        align = 'right'
    }
    else
    {
        align = 'left'
    }
    console.log(align)
    const classes = useStyles();
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
                const v = description.replace(description[i],"")
                event.target.value = v
            }
        }
    };
    const handleChangePrix = event =>
    { 
        prix = event.target.value
    };
    const handleChangeQuantity = event =>
    { 
        quantity = event.target.value
    };
    const [category, setCategory] = React.useState('');
    const handleChangeCategory = event => {
        setCategory(event.target.value);
        id_category = event.target.value
    };

/*------------------------Drag And Drop-----------------------*/
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
    
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
        console.table(files)
    }, [files]);

//----------------getCategory---------------
    axios.post('http://localhost:3001/getCat').then((r)=>
    {
        if(r.data)
        {
            if(localStorage.getItem('langue')  === 'en')
            {
                for(var i = 0;i <r.data.length ;i++)
                {
                    data[i] = <MenuItem  key = {i} value = {r.data[i].id_categorie}> {r.data[i].name_categorie}</MenuItem>
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
                        data[i] = <MenuItem  key = {i} value = {r.data[i].id_categorie}> {r.data[i].name_categorie}</MenuItem>
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
                        data[i] = <MenuItem  key = {i} value = {r.data[i].id_categorie}> {r.data[i].name_categorie}</MenuItem>
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
    return (
        <Container   maxWidth="lg" > 
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.h1} >
           <span className="addd">{t('annonce.ADD_AD')}</span>
          </Typography>
          <div className="divform">
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
                    {data}
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
                        endAdornment: <InputAdornment position="end">DH</InputAdornment>,
                    }}
                    inputProps={{
                        style: { textAlign: align },
                    }}
                  />
                </Grid>
              </ThemeProvider>
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
          </form>
          </div>
        </div>
      </Container>
    );
}