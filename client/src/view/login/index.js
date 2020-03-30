import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles , ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import { useTranslation } from 'react-i18next';
import './index.css'
var mssg = null
var form={
  phone:null,
  pswd:null,
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Copyrightar() {
  const { t } = useTranslation();
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
function Copyright() {
  const { t } = useTranslation();
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
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
const ColorButton = withStyles(theme => ({
  root: {
    color: "white",
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[900],
    },
  },
}))(Button);
const ContainerR = withStyles(theme => ({
  root: {
    borderRadius: '10%'
  },
}))(Container);
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://lh3.googleusercontent.com/proxy/oZpTD7RHGaoRbyuID6S7Fv3SLd6i2uFb8SIs5FD4k9C4YOEvzJLV1MlpDBpCa_XDCH7bwfQ5VdvoV2SaOS_HouWpsfrQshTfXREb_IPF1j0-Zb8gVhh6d5X_OhGpcy-Jqw6wVxNDicYMgDCnub8tcC8Rnmczi4iSwts2jVkUu180_MU-u_pjwr_pwiNHdC6w0wMfukrVhlLpgxa41Jia93lWuHOPUp37xQ)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: green[400],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    //margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  colorLink: {
    color : green[700],
  },
  input: {
    color: green[700],
  }
}));

export default function SignInSide(props) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();
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
  const handleChangePhone = (e)=>
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
  const send = ()=> {
    if(form.phone === null)
      form.phone = document.getElementById("Phone").value
    if(form.pswd === null)
      form.pswd = document.getElementById("password").value
    console.log(form.phone,form.pswd)
   if(form.phone && form.pswd )
    {
      if(form.phone.length === 10 && Number.isInteger(parseInt(form.phone)))
        {
          /*var n = 0, u = 0,l = 0, Upper = /^[A-Z]+$/, Lower = /^[a-z]+$/, number = /^[0-9]+$/;
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
          {*/
              const data ={phone:form.phone ,pswd:form.pswd}
              axios.post('http://localhost:3001/login',data)
              .then((r)=>
              {
                  if(r.data.status === "success")
                  {
                      props.history.push("/account/register") 
                  }
                  else
                  {
                    mssg =t('login.'+r.data.data)
                    setOpen(true);
                  }
              })
              .catch() 
         /* }
          else
          {
            mssg = "Password requires at least 1 lower 1 upper case letter and 1 digit and between 5 and 20"
            setOpen(true);
          }*/
      
        }
        else
        {
          mssg = t('login.PHONE')
          setOpen(true);
        }
      }
      else
      {
        mssg = t('login.DATA_MISSING')
        setOpen(true);
      }
    };
  const handleChangePswd =(e)=>
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
if(localStorage.getItem('langue')  !== "ar")
  {
  return (
    <React.Fragment>
                <section className="login-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                            <ContainerR  maxWidth="xs"  component={Paper} elevation={5}> 
                              <CssBaseline />
                              <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                  <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                  {t('login.h1')}
                                </Typography>
                                    <form className={classes.form} noValidate>
                                    <ThemeProvider theme={theme}>
                                    <Grid item xs={12}>
                                      <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Phone"
                                        label={t('login.LABEL_PHONE')}
                                        name="Phone"
                                        autoComplete="Phone"
                                        variant="outlined"
                                        autoFocus
                                        onChange={handleChangePhone}
                                        InputProps={{
                                        
                                          startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon /></InputAdornment>,
                                        }}
                                      />
                                      </Grid>
                                        <Grid item xs={12}>
                                      <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        value={values.Password}
                                        label={t('login.LABEL_PASS')}
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
                                      />
                                          <Link href="/forgot" variant="body2" className={classes.colorLink}>
                                            {t('login.F_MDP')}
                                          </Link>
                                        
                                      </Grid>
                                      <ColorButton
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick ={send}
                                      >
                                        {t('login.BTN_LOGIN')}
                                      </ColorButton>
                                      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity="error" >
                                          {mssg}
                                        </Alert>
                                    </Snackbar>
                                      {/* <Grid container > */}
                                        <Grid item>
                                          <Link href="/account/register" variant="body2" className={classes.colorLink}>
                                            {t('login.TO_SIGNUP')}
                                          </Link>
                                        </Grid>
                                      {/* </Grid> */}
                                      
                                      </ThemeProvider>
                                    </form>
                                  </div>
                                  <Box mt={5}>
                                        <Copyright />
                                  </Box>
                                  </ContainerR>
                            </div>

                            <div className="col-lg-6 col-md-12 mt-5">
                                <div className="new-customer-content">
                                    <span>{t('login.OPEN')}</span>
                                      <p>{t('login.TEXT')}</p>
                                    <Link href="/account/register" >
                                        <a className="btn btn-light">{t('login.OPEN')}</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
  );
      }
else
{
  return (
<React.Fragment>
    <section className="login-area">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-12 mt-5">
                    <div className="new-customer-content-ar">
                        <span >قم بإنشاء حساب</span>
                        <p>قم بالتسجيل للحصول على حساب مجاني في متجرنا. تسجيل سريع وسهل. يسمح لك أن تكون قادراً على الطلب من متجرنا. لبدء التسوق ، انقر فوق تسجيل.</p>
                        <Link href="/account/register" >
                            <a className="btn btn-light btn-a">إنشاء حساب</a>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <ContainerR  maxWidth="xs"  component={Paper} elevation={5}> 
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        تسجيل الدخول
                        </Typography>
                        <form className={classes.form} noValidate>
                        <ThemeProvider theme={theme}>
                        <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Phone"
                            label="رقم الهاتف"
                            name="Phone"
                            autoComplete="Phone"
                            variant="outlined"
                            autoFocus
                            onChange={handleChangePhone}
                            className={classes.test}
                            InputProps={{
                            
                            startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon /></InputAdornment>,
                            }}
                            inputProps={{
                            style: { textAlign: "right" },
                            }}
                        />
                        </Grid>
                            <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            value={values.Password}
                            label="كلمة السر"
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
                            onChange={handleChangePswd}
                        />
                        </Grid>
                        <ColorButton
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick ={send}
                        >
                            تسجيل الدخول
                        </ColorButton>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" >
                                {mssg}
                            </Alert>
                        </Snackbar>
                        <Grid container >
                            <Grid item xs >
                            <Link href="/forgot" variant="body2" className={classes.colorLink}>
                            نسيت كلمة السر؟
                            </Link>
                            </Grid>
                            <Grid item>
                            <Link href="/account/register" variant="body2" className={classes.colorLink}>
                                {"لا تملك حساب؟ أفتح حساب الأن"}
                            </Link>
                            </Grid>
                        </Grid>
                        </ThemeProvider>
                        </form>
                    </div>
                    <Box mt={5}>
                            <Copyrightar/>
                    </Box>
                </ContainerR>
                </div>
            </div>
        </div>
    </section>
</React.Fragment>
 );
}
}