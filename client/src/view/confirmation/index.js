import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { green , grey} from '@material-ui/core/colors';
import { makeStyles, withStyles , ThemeProvider , createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
const axios = require('axios')
var mssg =null
var form={
  code:null,
}
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

  if(!props || !props.location || !props.location.state || !props.location.state.phone )
    props.history.push('/login')
  axios.post('http://localhost:3001/check_token',{token:localStorage.getItem('token')}).then((r)=>{
        if(r.data.data !== "-2")
            props.history.push("/") 
    })
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {t} = useTranslation();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  const send =()=>{
    const data ={id:props.location.state.detail,code:form.code,phone:props.location.state.phone}
              axios.post('http://localhost:3001/confirmation',data)
              .then((r)=>
              {
                if(r.data.status === "success")
                {
                    props.history.push({
                      pathname: '/login',
                      state: { detail: r.data.data ,phone: form.phone}
                    })
                }
                else
                {
                  mssg =t('login.'+r.data.data)
                  setOpen(true);
                }
              })
  };
  const handleChangeCode =(e)=>
  {
    for(var i =0;i<e.target.value.length;i++)
    {
      if(i === 4)
      {
        const v = e.target.value.replace(e.target.value[i],"")
        e.target.value = v
      }
      if(!Number.isInteger(parseInt(e.target.value[i])))
      {
        const v = e.target.value.replace(e.target.value[i],"")
        e.target.value = v
      }
    }
    form.code = e.target.value
  }
  if(localStorage.getItem('langue') == "en")
  {return (
      <ContainerR  maxWidth="xs"  component={Paper} elevation={5}> 
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          VERIFY CODE
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="verification"
                  label="CODE"
                  name="verification"
                  autoComplete="verification"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
                  }}
                  onChange={handleChangeCode}
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
  else{
    return (
      <ContainerR  maxWidth="xs"  component={Paper} elevation={5}> 
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        تحقق من الرمز
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="verification"
                  label="الرمز"
                  name="verification"
                  autoComplete="verification"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
                  }}
                  inputProps={{
                    style: { textAlign: "right" },
                  }}
                  onChange={handleChangeCode}
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