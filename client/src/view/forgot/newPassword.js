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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useTranslation } from 'react-i18next';
const axios = require('axios')
var mssg =null
var form={
  pswd:null,
  cpswd:null
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
  );}

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
  if(!props || !props.location || !props.location.state || !props.location.state.phone ||  !props.location.state.done || props.location.state.done !== 'success')
      props.history.push('/account/login')
  const classes = useStyles();
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleChangePassword =(e)=>
  {
    var n = 0;
    var u = 0;
    var l = 0;
    var Upper = /^[A-Z]+$/;
    var Lower = /^[a-z]+$/;
    var number = /^[0-9]+$/;
    for(var i = 0 ;i<e.target.value.length;i++)
    {
      if(e.target.value[i].match(Upper))
          u = 1
      if(e.target.value[i].match(Lower))
          l = 1
      if(e.target.value[i].match(number))
          n = 1
    }
    if(e.target.value.length<6 || e.target.value.length >20 || n === 0 || u === 0 || l === 0)
      e.target.style.color= "red"
    else
      e.target.style.color= "green"
      form.pswd = e.target.value
  };
  const send =()=>{
                
    if(form.pswd === null)
      form.pswd = document.getElementById("password").value
    if(form.cpswd === null)
      form.cpswd = document.getElementById("Cpassword").value
      if(form.pswd)
        {
            var n = 0, u = 0,l = 0, Upper = /^[A-Z]+$/, Lower = /^[a-z]+$/, number = /^[0-9]+$/;
            for(var i = 0 ;i<form.pswd.length;i++)
            {
                if(form.pswd[i].match(Upper))
                    u = 1
                if(form.pswd[i].match(Lower))
                    l = 1
                if(form.pswd[i].match(number))
                    n = 1
            }
            if(n !== 0 && u !== 0 && l !== 0 && form.pswd.length > 5 && form.pswd.length <21)
            {
                if(form.pswd === form.cpswd)
                {
                    const data ={pswd:form.pswd,phone:props.location.state.phone}
                    axios.post('http://localhost:3001/updatepswd',data)
                    .then((r)=>
                    {
                    if(r.data.status === "success")
                    {
                            props.history.push({
                            pathname: '/account/login'})
                    }
                    else
                    {
                        mssg = t('login.'+r.data.data)
                        setOpen(true);
                    }
                    })
                    .catch()
                }
                else
                {
                    mssg = t('login.PSWD_CONFI')
                    setOpen(true)
                }
            }
            else
            {
                mssg = t('login.PSWD')
                setOpen(true);
            }
        }
        else
        {
            mssg = t('login.DATA_MISSING')
            setOpen(true);
        }
  };
  const [values, setValues, ] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  if(localStorage.getItem('langue') === 'en')
  {return (
      <ContainerR  maxWidth="xs"  component={Paper} elevation={5}> 
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Change Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <ThemeProvider theme={theme}>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  value={values.Password}
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  type={values.showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
                  }}
                  onChange={handleChangePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Cpassword"
                  label="Confirmation Password"
                  type="password"
                  id="Cpassword"
                  value={values.Password}
                  autoComplete="current-password"
                  type={values.showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
                  }}
                  onChange={(e)=>
                  {
                    form.cpswd = e.target.value
                  }}
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
              UPDATE
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
        تغيير كلمة السر
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <ThemeProvider theme={theme}>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  value={values.Password}
                  label="كلمة سر جديدة"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  type={values.showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
                  }}
                  inputProps={{
                    style: { textAlign: "right" },
                  }}
                  onChange={handleChangePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Cpassword"
                  label="تأكيد كلمةالسر"
                  type="password"
                  id="Cpassword"
                  value={values.Password}
                  autoComplete="current-password"
                  type={values.showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
                  }}
                  inputProps={{
                    style: { textAlign: "right" },
                  }}
                  onChange={(e)=>
                  {
                    form.cpswd = e.target.value
                  }}
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
              تغيير
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