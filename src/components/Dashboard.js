import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { actions } from "../actions";
import products from '../product.json'

const Dashboard = () =>{
    const dispatch = useDispatch();
    const samp = useSelector(
        (state) =>  state.mainReducer.allProducts)
      console.log(samp,"samp"); 
        useEffect(()=>{
            dispatch(actions.getAllProducts())
        },[])
      return(
    <div>
        Shaik
    </div>
)
}
export default Dashboard