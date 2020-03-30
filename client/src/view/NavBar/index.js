import React from 'react';
import { makeStyles , withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TranslateOutlinedIcon from '@material-ui/icons/TranslateOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { grey, green} from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';
import logo from  "../../images/logo.jpeg";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const NavBar = withStyles(theme => ({
  root: {
    backgroundColor: "#F6F6F6",
    color: "black"
  },
}))(AppBar);

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  btn: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      color: green[700],
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  Link: {
    color: grey[900],
    textDecoration: 'none'
  },
  navbarLinkActive: {
    color: green[800],
  },
  image: {
    width: '80px',
  },
}));

export default function PrimarySearchAppBar() {

  const {t} = useTranslation();
  
  const classes = useStyles();
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isLanguageMenuOpen = Boolean(languageAnchorEl);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

 
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuOpen = event => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  
  };
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
    handleMobileMenuClose();
  };
  const changeL = (lng) => {
    i18next.changeLanguage(lng)
    localStorage.setItem('langue', lng)
  }

  const LmenuId = 'primary-search-language-menu';
  const renderLanguageMenu = (
    <Menu
      anchorEl={languageAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={LmenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isLanguageMenuOpen}
      onClose={handleLanguageMenuClose}
    >
      <MenuItem onClick={() => {handleLanguageMenuClose(); changeL('ar')}} className={classes.btn}>العربية</MenuItem>
      <MenuItem onClick={() => {handleLanguageMenuClose(); changeL('en')}} className={classes.btn}>English</MenuItem>
      <MenuItem onClick={() => {handleLanguageMenuClose(); changeL('fr')}} className={classes.btn}>Français</MenuItem>
    </Menu>
  );

  if (localStorage.getItem('langue')  !== 'ar'){
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <a href="/account/login" className={classes.btn} activeClassName={classes.navbarLinkActive}>
          <MenuItem onClick={handleMenuClose} >{t('nav.LOGIN')}</MenuItem>
        </a>
        <a href="/account/register" className={classes.btn} activeClassName={classes.navbarLinkActive}>
          <MenuItem onClick={handleMenuClose} >{t('nav.REGISTER')}</MenuItem>
        </a>
      </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <a href="/" className={classes.btn} activeClassName={classes.navbarLinkActive}>
          <MenuItem >
            <HomeOutlinedIcon /> <Box fontWeight="fontWeightBold" >{t('nav.HOME')}</Box>
          </MenuItem>
        </a>

        <a href="/account/login" className={classes.btn} activeClassName={classes.navbarLinkActive}>
          <MenuItem  >
          {/* onClick={handleProfileMenuOpen} */}
            <PersonOutlineOutlinedIcon /><Box fontWeight="fontWeightBold">{t('nav.ACCOUNT')}</Box><ArrowDropDownOutlinedIcon />
          </MenuItem>
        </a>

        <NavLink  to="/viewcart" className={classes.btn} activeClassName={classes.navbarLinkActive}>
          <MenuItem>
            <ShoppingCartOutlinedIcon /> <Box fontWeight="fontWeightBold" >{t('nav.CART')}(0)</Box>
          </MenuItem>
        </NavLink>

        <MenuItem className={classes.btn} onClick={handleLanguageMenuOpen}>
          <TranslateOutlinedIcon /> <Box fontWeight="fontWeightBold">{t('nav.LANGUAGE')}</Box><ArrowDropDownOutlinedIcon />
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.grow}>
        <NavBar position="static">
          <Toolbar >
            <Typography >
                <img src={logo} alt="Logo" className={classes.image}/>
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <a href="/" className={classes.btn} activeClassName={classes.navbarLinkActive}>
                <Button
                  edge="end"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <Box fontWeight="fontWeightBold">{t('nav.HOME')}</Box>
                </Button> 
              </a>

              <NavLink  to="/account" className={classes.btn} activeClassName={classes.navbarLinkActive}>
                <Button
                  edge="end"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleProfileMenuOpen }
                >
                  <Box fontWeight="fontWeightBold">{t('nav.ACCOUNT')}</Box><ArrowDropDownOutlinedIcon />
                </Button> 
              </NavLink>

              <NavLink  to="/viewcart" className={classes.btn} activeClassName={classes.navbarLinkActive}>
                <Button
                  edge="end"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <ShoppingCartOutlinedIcon /> <Box fontWeight="fontWeightBold" >{t('nav.CART')}(0)</Box>
                </Button>
              </NavLink>

              <Button
                edge="end"
                aria-label="language of current user"
                aria-haspopup="true"
                color="inherit"
                aria-controls={LmenuId}
                onClick={handleLanguageMenuOpen }
                className={classes.btn}
              >
                <TranslateOutlinedIcon /> <Box fontWeight="fontWeightBold">{t('nav.LANGUAGE')}</Box><ArrowDropDownOutlinedIcon />
              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </NavBar>
        {renderMobileMenu}
        {renderMenu}
        {renderLanguageMenu}
      </div>
    );
  }
  else {
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <a href="/account/login" className={classes.btn} activeClassName={classes.navbarLinkActive}>
          <MenuItem onClick={handleMenuClose} >تسجيل الدخول</MenuItem>
        </a>
        <a href="/account/register" className={classes.btn} activeClassName={classes.navbarLinkActive}>
          <MenuItem onClick={handleMenuClose} >أفتح حساب</MenuItem>
        </a>
      </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <a href="/" className={classes.btn} activeClassName={classes.navbarLinkActive}>
          <MenuItem >
            <HomeOutlinedIcon /> <Box fontWeight="fontWeightBold" >الرئيسية</Box>
          </MenuItem>
        </a>

        <NavLink  to="/account" className={classes.btn} activeClassName={classes.navbarLinkActive}>
          <MenuItem onClick={handleProfileMenuOpen} >
            <PersonOutlineOutlinedIcon /><Box fontWeight="fontWeightBold">الحساب</Box><ArrowDropDownOutlinedIcon />
          </MenuItem>
        </NavLink>

        <NavLink  to="/viewcart" className={classes.btn} activeClassName={classes.navbarLinkActive}>
          <MenuItem>
            <ShoppingCartOutlinedIcon /> <Box fontWeight="fontWeightBold" >عرض السلة(0)0</Box>
          </MenuItem>
        </NavLink>

        <MenuItem className={classes.btn} onClick={handleLanguageMenuOpen}>
          <TranslateOutlinedIcon /> <Box fontWeight="fontWeightBold">اللغة</Box><ArrowDropDownOutlinedIcon />
        </MenuItem>
      </Menu>
    );
  return (
      <div className={classes.grow}>
        <NavBar position="static">
          {/* <Toolbar width= "100%"> */}
          <Box display="flex" flexDirection="row-reverse" style={{padding: "1% 3% 1% 1%"}}>
            <Typography style={{ textAlign: "right"}} className={classes.grow}>
                <img src={logo} alt="Logo" className={classes.image}/>
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}  style={{paddingTop: "3px"}}>
              <NavLink to="#" className={classes.btn} activeClassName={classes.navbarLinkActive}>
                <Button
                  edge="end"
                  aria-label="language of current user"
                  aria-haspopup="true"
                  color="inherit"
                  aria-controls={LmenuId}
                  onClick={handleLanguageMenuOpen }
                  className={classes.btn}
                >
                  < ArrowDropDownOutlinedIcon/> <Box fontWeight="fontWeightBold">اللغة</Box>< TranslateOutlinedIcon/>
                </Button>
              </NavLink>
              <NavLink  to="/cc" className={classes.btn} activeClassName={classes.navbarLinkActive}>
                <Button
                  edge="end"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <Box fontWeight="fontWeightBold" >عرض السلة(0)0</Box><ShoppingCartOutlinedIcon />
                </Button>
              </NavLink>
              <NavLink  to="/account" className={classes.btn} activeClassName={classes.navbarLinkActive}>
                <Button
                  edge="end"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <ArrowDropDownOutlinedIcon /><Box fontWeight="fontWeightBold">الحساب</Box>
                </Button> 
              </NavLink>
              <a href="/" className={classes.btn} activeClassName={classes.navbarLinkActive}>
                <Button
                  edge="end"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <Box fontWeight="fontWeightBold">الرئيسية</Box>
                </Button> 
              </a>
            </div>
            <div className={classes.sectionMobile} >
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
            </Box>
          {/* </Toolbar> */}
        </NavBar>
        {renderMobileMenu}
        {renderMenu}
        {renderLanguageMenu}
      </div>
    );
  }
}