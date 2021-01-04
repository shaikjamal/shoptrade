import React,{Fragment,useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Divider } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useSelector,useDispatch } from "react-redux";
import { actions } from "../../actions";


const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});

const useStyles = makeStyles((theme) => ({

  root: {
    [theme.breakpoints.down('lg')]: {
      width: "18%",
    },
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Options = ({sizes,addAllProducts,comparedPrice,price,name}) =>{
  return(
    <Box 
      display="flex"  
      position="absolute" 
      flexDirection="column" 
      bgcolor="#fafafa" 
      color="#000" 
      justifyContent="center" 
      mx="auto" 
      width="120px" 
      top="100px" 
      left="45%"
      borderRadius={5}
      
    >
    {sizes&&sizes.length&&sizes.map((size)=>{
      return(
        <Fragment>
          <Button width="100px" onClick={()=>{addAllProducts([{name,price,comparedPrice,options:{size}}])}} textAlign="left">{size.name}:{size.value}</Button>
          <Divider/>
        </Fragment>
      )
    })}
    </Box>
  )
}

export default function Card({product}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const diffBetwPrice = product&& product.compare_at_price -  product.price
  const increase  = diffBetwPrice- product.compare_at_price 
  const percentageOff =  Math.floor(((increase/product.compare_at_price)*100)+100)
  const [showOption,toggleOptions] = useState('false')
  const [selectedProduct,addAllProducts] = useState(false)
  const selectedSize = selectedProduct?.[0]?.options?.size?.value
  useEffect(()=>{
    toggleOptions(false)
  },[])

  return (
    
    // <Tooltip disableFocusListener disableTouchListener title={<Options sizes={product.options} />}>
    <ThemeProvider theme={theme}>
    <Box className={classes.root} mx="8px" my={1} boxShadow={2} justifyContent="center" onMouseEnter={()=>toggleOptions(true)}
    onMouseLeave={()=>toggleOptions(false)}>
    <CardActionArea>
    <img alt="Remy Sharp" src={product.image_src} style={{width:"100%",height:"300px"}} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.vendor}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" style={{whiteSpace: "nowrap", overflow: "hidden",
  textOverflow: "ellipsis"}}>
          {product.name}
        </Typography>
      <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" mb={1}>
        <Box fontWeight="bolder"  mr={0.5}>
          ${product.price}
        </Box>
        <Box fontWeight="bolder"  color="text.secondary" mr={0.5} style={{textDecoration:"line-through",textOverflow:"ellipsis"}}>
          ${product.compare_at_price}
        </Box>
        <Typography  variant="body2" style={{color:"red"}}>
          ({percentageOff}% OFF)
        </Typography>
      </Box>
     {selectedProduct?.[0]?.options ? 
     <Box display="flex"  justifyContent="center">
      <Typography  variant="body" component="p">
         Selected Size: {selectedSize}
        </Typography>
      </Box>
        :<Fragment/>}
      </CardContent>
      {showOption?
      <Options 
        sizes={product.options} 
        addAllProducts={addAllProducts} 
        selectedProduct={selectedProduct}
        name={product.name}
        price={product.price}
        comparedPrice={product.compare_at_price}
        />
      :<Fragment/>}
      {selectedProduct  ?
      <Box display="flex" justifyContent="center" mb={2}>
      <Button onClick={()=>{
          dispatch(actions.addProductsToCart(selectedProduct))
      }}  variant="contained">
        Add to Cart
      </Button>
      </Box>
      :<Fragment/>} 
    </CardActionArea>
  </Box>
  </ThemeProvider>

  );
}
