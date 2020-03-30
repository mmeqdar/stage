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
import { useTranslation } from 'react-i18next';
const axios = require('axios')
var mssg =null
var ph = null;
var form={
  code:null
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
};
const handleClickSend =()=>{
  if(form.code === null)
    form.code = document.getElementById("verification").value
  const data ={id:props.location.state.detail,code:form.code,phone:props.location.state.phone}
  axios.post('http://localhost:3001/forgot1',data)
  .then((r)=>
  {
    if(r.data.status === "success")
    {
        props.history.push({
          pathname: '/newPassword',
          state: { phone: props.location.state.phone,done:r.data.status}
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
 if(localStorage.getItem('langue') === 'en') 
 {return (
      <ContainerR  maxWidth="xs"  component={Paper} elevation={5}> 
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
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
              onClick={handleClickSend}
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
                  autoFocus
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
              onClick={handleClickSend}
            > إرسال
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