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
import logo from  "../../images/logo.jpeg";
import i18next from 'i18next';

const NavBar = withStyles(theme => ({
  root: {
    color: 'black',
    backgroundColor: "#F6F6F6"
  },
}))(AppBar);

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  btn: {
    '&:hover': {
      color: green[700],
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
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
  image: {
    width: '70px',
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
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
      <MenuItem onClick={handleMenuClose} ><a href="/account/login"  className={classes.Link}>Login</a></MenuItem>
      <MenuItem onClick={handleMenuClose} ><a href="/account/register" className={classes.Link}>Rogister</a></MenuItem>
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
      <MenuItem className={classes.btn}>
        <HomeOutlinedIcon /> <Box fontWeight="fontWeightBold" >Home</Box>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} className={classes.btn}>
        <PersonOutlineOutlinedIcon /><Box fontWeight="fontWeightBold">Account</Box><ArrowDropDownOutlinedIcon />
      </MenuItem>
      <MenuItem className={classes.btn}>
        <ShoppingCartOutlinedIcon /> <Box fontWeight="fontWeightBold" >View Cart(0)</Box>
      </MenuItem>
      <MenuItem className={classes.btn}>
        <TranslateOutlinedIcon /> <Box fontWeight="fontWeightBold">English</Box><ArrowDropDownOutlinedIcon />
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <NavBar position="static">
        <Toolbar>
          <Typography  noWrap>
              <img src={logo} alt="Logo" className={classes.image}/>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              edge="end"
              aria-haspopup="true"
              color="inherit"
              className={classes.btn}
            >
              <Box fontWeight="fontWeightBold">Home</Box>
            </Button>

            <Button
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              className={classes.btn}
            >
              <Box fontWeight="fontWeightBold">Account</Box><ArrowDropDownOutlinedIcon />
            </Button>

            <Button
              edge="end"
              aria-haspopup="true"
              color="inherit"
              className={classes.btn}
            >
              <ShoppingCartOutlinedIcon /> <Box fontWeight="fontWeightBold" >View Cart(0)</Box>
            </Button>

            <Button
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              className={classes.btn}
              onClick={()=>{ i18next.changeLanguage('en')
              localStorage.setItem('i18nextLng', 'en')}}
            >
              <TranslateOutlinedIcon /> <Box fontWeight="fontWeightBold">English</Box><ArrowDropDownOutlinedIcon />
            </Button>
            <Button
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              className={classes.btn}
              onClick={()=>{ i18next.changeLanguage('ar')
              localStorage.setItem('i18nextLng', 'ar')}}
            >
              <TranslateOutlinedIcon /> <Box fontWeight="fontWeightBold">arabic</Box><ArrowDropDownOutlinedIcon />
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
    </div>
  );
}