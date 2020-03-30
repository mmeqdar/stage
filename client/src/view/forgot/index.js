import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { green , grey} from '@material-ui/core/colors';
import { makeStyles, withStyles , ThemeProvider , createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
const axios = require('axios')
var form={
  phone:null
}
var mssg =null

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Agri Edge
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function Copyrightar() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'.'}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="https://material-ui.com/">
        AgriEdge
      </Link>
      {' © حقوق النشر'}
    </Typography>
  );
}
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});


const ContainerR = withStyles(theme => ({
  root: {
    borderRadius: '10%'
  },
}))(Container);

const ColorButton = withStyles(theme => ({
  root: {
    color: "white",
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[900],
    },
  },
}))(Button);

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: green[500],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  colorLink: {
    color : grey[800],
    '&:hover': {
      color : green[700],
    },
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') 
    {
      return;
    }

    setOpen(false);
  };
const send =()=>{
  const data ={phone:form.phone}
  axios.post('http://localhost:3001/forgot',data)
  .then((r)=>
  {
    if(r.data.status === "success")
    {
        props.history.push({
          pathname: '/verif',
          state: { detail: r.data.data ,phone: form.phone}
        })
    }
    else
    {
      mssg = t('login.'+r.data.data)
      setOpen(true);
    }
  })
  .catch()
};
const handleChangePhone =(e)=>
{
  
  const t = e.target.value
  for(var i=0;i<t.length;i++)
  {
    if(!Number.isInteger(parseInt(t[i])))
      {
        const v = t.replace(t[i],"")
        e.target.value = v
      }
  }
  if(e.target.value.length<10 || e.target.value.length >10)
    e.target.style.color= "red"
  else
    e.target.style.color= "green"
    form.phone = e.target.value
};
  //var code = null;
 if(localStorage.getItem('langue') == 'en') 
 {
   return (
      <ContainerR  maxWidth="xs"  component={Paper} elevation={5}> 
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        FORGOT PASSWORD
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <ThemeProvider theme={theme}>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon /></InputAdornment>,
                  }}
                  onChange={handleChangePhone}
                />
              </Grid>
            </ThemeProvider>
          </Grid>
          <ColorButton
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={send}
            >
              SEND
          </ColorButton>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" >
                 {mssg}
              </Alert>
          </Snackbar>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </ContainerR>
  );}
  else
  {
    return (
      <ContainerR  maxWidth="xs"  component={Paper} elevation={5}> 
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        نسيت كلمة المرور
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <ThemeProvider theme={theme}>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="رقم الهاتف"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon /></InputAdornment>,
                  }}
                  inputProps={{
                    style: { textAlign: "right" },
                  }}
                  onChange={handleChangePhone}
                />
              </Grid>
            </ThemeProvider>
          </Grid>
          <ColorButton
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={send}
            >
              إرسال
          </ColorButton>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" >
                 {mssg}
              </Alert>
          </Snackbar>
        </form>
      </div>
      <Box mt={5}>
        <Copyrightar />
      </Box>
    </ContainerR>
  );
  }
}