import React, { useEffect ,Fragment,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useSelector,useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Card from "./common/Card";
import Modal from "./common/Modal";
import { actions } from "../actions";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import Badge from '@material-ui/core/Badge';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import PolymerIcon from '@material-ui/icons/Polymer';
import allProducts from '../product.json'




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginBottom:10
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display:"flex",
    [theme.breakpoints.down('lg')]: {
      flexDirection:"row",
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection:"column",
    },
    flexGrow: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  form: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const filterlist  = [
  {Name:"All products",value:"all",brand:""},
  {Name:"Tee Shirt",value:"T-shirt",brand:""},
  {Name:"Denim",value:"Denim",brand:""},
  {Name:"Sweatshirts",value:"sweat",brand:""},
  {Name:"Polo Tee Shirt",value:"T-shirt",brand:"U.S Polo Assn."},
  {Name:"Shirt",value:"shirt",brand:""}
]

const Dashboard = () =>{
    const classes = useStyles()
    const dispatch = useDispatch();
    const [products,productByType] =useState(allProducts)
    const cartProducts = useSelector((state) =>  state.mainReducer.cartProducts)
    const [activeFilter,setActiveFilter] =useState("All products")
    const [modalStatus,setModalStatus] =useState(false)

   const filerProducts=(type,brand)=>{
     let filterByType =[]
     if (type =="all" ) {
      productByType(allProducts)
     }
     else if(type == "sweat"){
      filterByType =  allProducts.filter((prod)=>(prod.name == "Men's Pullover Sweatshirt"))
      productByType(filterByType)
     }
    else if (brand) {
      filterByType =  allProducts.filter((prod)=>((prod.tag ==type)&&(prod.vendor == brand)))
      productByType(filterByType)
     }
     else{
      filterByType =  allProducts.filter((prod)=>prod.tag ==type)
      productByType(filterByType)
     }
    }

        useEffect(()=>{
            dispatch(actions.getAllProducts())
            // filterProducts(allProducts)
        },[])


      return(
        <Fragment>
          {/* Header */}
        <div className={classes.root}>
          <AppBar position="fixed" color="#fff" mb={2}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <PolymerIcon  />           
             </IconButton>
             
             <Box className={classes.title} >
             {["Shops","About Us","Our Stores","Contact Us"].map((item)=>{
               return(
                <Typography variant="body" style={{margin:"0px 10px"}}>
                {item}
              </Typography>
               )
             })}
              </Box>
              <Box component="form" className={classes.form}>
                <InputBase
                  className={classes.input}
                  placeholder="Search"
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Box> 
              <IconButton aria-label="delete">
                <PersonRoundedIcon />
              </IconButton> 
              {cartProducts&&cartProducts.length ? 
              <IconButton onClick={()=>setModalStatus(true)} aria-label="delete">
              <Badge badgeContent={cartProducts.length} color="secondary">
                <ShoppingCartOutlinedIcon />
                </Badge>        
              </IconButton> :
              <IconButton aria-label="delete">
                <ShoppingCartOutlinedIcon />
              </IconButton> }   
              </Toolbar>
          </AppBar>
        </div>
        {/* Header */}
        <Box height={50}/>
        <Box height={50} width="100%" style={{backgroundImage:`linear-gradient(to right,black, red)`}}>
          <Typography>
          Invite Friends to big Fashion Festival
          </Typography>
        </Box>
        <Breadcrumbs aria-label="breadcrumb" style={{marginTop:"10px",marginBottom:"10px"}}>
          <Link color="inherit">
            Home
          </Link>
          <Link color="inherit">
            Clothing
          </Link>
          <Link color="textPrimary">
            Mens CLothing
          </Link>
          <Link color="textPrimary" aria-current="page">
            All Mens CLothing
          </Link>
        </Breadcrumbs>
        <Box height={50} fontSize={24} fontWeight="bold" width="100%">
          All Products <span style={{fontWeight:"normal", color:"#ccc"}}>({products&&products.length} products)</span>
        </Box>
        <Box height={50} fontSize={24} fontWeight="bold" width="100%">
          Filters : 
          {filterlist.map((item)=>{
            return(
              <Button 
              onClick={()=>{
                setActiveFilter(item.Name)
                filerProducts(item.value,item.brand)
              }}
                variant="outlined" 
                size="medium"  
                style={{borderRadius:"25px",marginRight:"8px",
                borderColor:activeFilter==item.Name?"#000":"rgba(0, 0, 0, 0.23)",
                color:activeFilter==item.Name?"#000":"rgba(0, 0, 0, 0.23)"}}
                >
                {item.Name}
              </Button>
            )
          })}
         
        </Box>
        {products&&products.length >=1? 
        <Grid container justify="center" spacing={1} xs={12} sm={6}  md={12} lg={12}>
        {products.map((product) => (
            <Card product={product}/>
        ))}
      </Grid>
      :<Fragment/>}
      <Modal prod={cartProducts} visible={modalStatus} closeModal={()=>setModalStatus(false)} />
      </Fragment>
)
}
export default Dashboard