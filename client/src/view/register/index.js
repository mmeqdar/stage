import React from 'react';
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { green , grey} from '@material-ui/core/colors';
import { makeStyles, withStyles , ThemeProvider , createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useTranslation } from 'react-i18next';

var mssg = null
var data = []
var form={
  name : null,
  phone : null,
  pswd : null,
  cpswd : null,
  id_reg :null,
  type : null
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
    marginTop: theme.spacing(3),
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 225,
    width: '100%',
  }
}));

export default function SignUp(props) {
  axios.post('http://localhost:3001/check_token',{token:localStorage.getItem('token')}).then((r)=>{
        if(r.data.data !== "-2")
            props.history.push("/") 
    })
  const [open, setOpen] = React.useState(false);
  const {t} = useTranslation();
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
  const [region, setRegion] = React.useState('');
  const [type, setType] = React.useState('');
  
  const handleChangeRegion = event => {
    setRegion(event.target.value);
    form.id_reg = event.target.value
  };
  const handleChangeType = event => {
    setType(event.target.value);
    form.type = event.target.value
  };
  const handleChangePassword =event =>
    {
      var n = 0;
      var u = 0;
      var l = 0;
      var Upper = /^[A-Z]+$/;
      var Lower = /^[a-z]+$/;
      var number = /^[0-9]+$/;
      for(var i = 0 ;i<event.target.value.length;i++)
      {
        if(event.target.value[i].match(Upper))
            u = 1
        if(event.target.value[i].match(Lower))
            l = 1
        if(event.target.value[i].match(number))
            n = 1
      }
      if(event.target.value.length<6 || event.target.value.length >20 || n === 0 || u === 0 || l === 0)
       event.target.style.color= "red"
      else
       event.target.style.color= "green"
        form.pswd =event.target.value
    };
  const handleChangePhone =event =>
    {
      const t = event.target.value
      for(var i=0;i<t.length;i++)
      {
        if(!Number.isInteger(parseInt(t[i])))
          {
            const v = t.replace(t[i],"")
            event.target.value = v
          }
      }
      if(event.target.value.length<10 || event.target.value.length >10)
        event.target.style.color= "red"
      else
        event.target.style.color= "green"
        form.phone = event.target.value
    }
  const handleChangeName = event=>
    {
      const t = event.target.value
      var letter = /^[a-zA-Z ]+$/;
      for(var i=0;i<t.length;i++)
      {
        if(!t[i].match(letter))
          {
            const v = t.replace(t[i],"")
            event.target.value = v
          }
      }
      if(event.target.value.length<5 || event.target.value.length >30)
        event.target.style.color= "red"
      else
        event.target.style.color= "green"
        form.name = event.target.value
    };
const register =()=>{
if(form.phone && form.name && form.pswd && form.cpswd &&form.id_reg && form.type)
{
  var letter = /^[a-zA-Z ]+$/;
  if(form.name.length >= 5 && form.name.length <= 30 && form.name.match(letter))
  {
    if(form.phone.length === 10 && Number.isInteger(parseInt(form.phone)))
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
          if(form.id_reg === 1 || form.id_reg === 2 || form.id_reg === 3 || form.id_reg === 4 || form.id_reg === 5 || form.id_reg === 6 || form.id_reg === 7 || form.id_reg === 8 || form.id_reg === 9 || form.id_reg === 10 || form.id_reg === 11 || form.id_reg === 12)
          {
            if(form.type == 0 || form.type == 1)
            {
              const data ={name:form.name,phone:form.phone,pswd:form.pswd,region:form.id_reg,type:form.type}
              axios.post('http://localhost:3001/register',data)
              .then((r)=>
              {
                if(r.data.status === "success")
                {
                  props.history.push({
                    pathname: '/confirmation',
                    state: { detail: r.data.data ,phone: form.phone}
                  })
                }
                else
                {
                  mssg = t('login.'+r.data.data)
                  setOpen(true);
                }
              })
            }
            else
            {
              mssg = t('login.TYPE')
              setOpen(true);
            }
            
          }
          else
          {
            mssg = t('login.REGION')
            setOpen(true);
          }
        }
        else
        {
          mssg = t('login.PSWD_CONFI')
          setOpen(true);
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
      mssg = t('login.PHONE')
      setOpen(true);
    }
  }
  else
  {
    mssg = t('login.NAME')
    setOpen(true);
  }
  
}
else
{
  mssg = t('login.DATA_MISSING')
  setOpen(true);
}
};
  axios.post('http://localhost:3001/getRegion').then((r)=>
  {
      if(r.data)
      {
        if(localStorage.getItem('langue')  !== 'ar')
        {
          for(var i = 0;i <r.data.length ;i++)
          {
            data[i] = <MenuItem  key = {i} value = {r.data[i].id_region}> {r.data[i].name_region}</MenuItem>
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
            data[i] = <MenuItem  key = {i} value = {r.data[i].id_region}> {r.data[i].name_region}</MenuItem>
          }
        }
      }
  }) 
 if(localStorage.getItem('langue') !== 'ar') {
   return (
      <ContainerR  maxWidth="xs"  component={Paper} elevation={5}> 
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('register.h1')}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    autoFocus
                    fullWidth
                    id="fullName"
                    label={t('register.LABEL_NAME')}
                    name="fullName"
                    autoComplete="fname"
                    onChange={handleChangeName}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><PersonOutlineOutlinedIcon /></InputAdornment>,
                    }}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label={t('register.LABEL_PHONE')}
                  name="phone"
                  autoComplete="phone"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon /></InputAdornment>,
                  }}
                  onChange={handleChangePhone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  value={values.Password}
                  label={t('register.LABEL_PASS')}
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
                  label={t('register.LABEL_CPASS')}
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
              <FormControl variant="outlined"  className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">{t('register.LABEL_REG')}*</InputLabel>
                <Select
                  label="region*"
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={region}
                  onChange={handleChangeRegion}
                >
                  {data}
                </Select>
              </FormControl>
              <FormControl variant="outlined"  className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">{t('register.LABEL_TYPE')}*</InputLabel>
                <Select
                  label="type*"
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={type}
                  onChange={handleChangeType }
                >
                  <MenuItem  value = "1"> {t('register.ACHETEUR')}</MenuItem>
                  <MenuItem  value = "0"> {t('register.VENDEUR')}</MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>
          <ColorButton
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={register}
            >
              {t('register.BTN_SIGNUP')}
          </ColorButton>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" >
                 {mssg}
              </Alert>
          </Snackbar>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" className={classes.colorLink}>
                {t('register.TO_SIGNIN')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </ContainerR>
  );}
  else
  {
    return (
      <ContainerR  maxWidth="xs"  component={Paper} elevation={5}> 
      <CssBaseline />
      
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          أفتح حساب
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    autoFocus
                    required
                    fullWidth
                    id="fullName"
                    label="الاسم الكامل"
                    name="fullName"
                    autoComplete="fname"
                    onChange={handleChangeName}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><PersonOutlineOutlinedIcon /></InputAdornment>,
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
                  id="phone"
                  label="رقم الهاتف"
                  name="phone"
                  autoComplete="phone"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon /></InputAdornment>,
                  }}
                  inputProps={{
                    style: { textAlign: "right" },
                  }}
                  onChange={handleChangePhone}
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
              <FormControl variant="outlined"  className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">الجهة*</InputLabel>
                <Select
                  label="الجهة"
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={region}
                  onChange={handleChangeRegion }
                >
                  {data}
                </Select>
              </FormControl>
              <FormControl variant="outlined"  className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">نوع الحساب*</InputLabel>
                <Select
                  label="type*"
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={type}
                  onChange={handleChangeType }
                >
                  <MenuItem  value = "1"> المشتري</MenuItem>
                  <MenuItem  value = "0"> البائع</MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>
          <ColorButton
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={register}
            >
              تسجيل
          </ColorButton>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" >
                 {mssg}
              </Alert>
          </Snackbar>
          <Grid container justify="flex-end">
            <Grid item>
                <Link href="/login" variant="body2" className={classes.colorLink}>
                 {"أنا عضو بالفعل"}
                </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </ContainerR>
  );
  }
}