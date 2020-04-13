import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { grey, green} from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  typo: {
    color: grey[900],
    height: "50px",
    paddingTop: "5px",
    marginTop: "40px"
    
  },
  sp: {
    color: green[700],
  }
}));
function Copyright() {
    const { t } = useTranslation();
    const classes = useStyles();
    if(localStorage.getItem('langue')  !== 'ar')
    {
        return (
            <Typography variant="body2" className={classes.typo} align="center">
                {t('copyright')}{'© '}
                <span className={classes.sp}>Agri Edge</span>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }
    else
    {
        return (
            <Typography variant="body2" className={classes.typo} align="center">
                {'.'}{new Date().getFullYear()}
                {' '} <span className={classes.sp}>Agri Edge</span>
                {' ©'}{t('copyright')}
            </Typography>
            );
    }
  }

  export default function Footer() 
  {
      return (
        <Copyright/>
      )
    
  }