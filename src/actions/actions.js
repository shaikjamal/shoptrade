/* eslint-disable import/prefer-default-export */
import axios from "axios";
// import moment from 'moment';
import * as API_END_POINTS from "../constants/api";
import * as types from "../constants/actionTypes";

// const FileDownload = require('js-file-download');
function replaceAt(s, n, t) {
  return s.substring(0, n) + t + s.substring(n + 1);
}
// Action function for get user transaction function
export function getAllProducts() {
  return (dispatch) => {
    axios
      .get(API_END_POINTS.ALL_PRODUCTS, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data =replaceAt(response&&response.data,response&&response.data.lastIndexOf(","),"")
        if (response.status == 200 &&
           data&&data.length>=1) {
            dispatch({
              type: types.ALL_PRODUCTS,
              allProducts: JSON.parse(data),
            });
        }
      
      })
      .catch((err) => {
        if (err && err.config) {
          dispatch({
            type: types.ALL_PRODUCTS,
            unableToFetch: true,
          });
        }
      });
  };
}

export function addProductsToCart(product) {
  return (dispatch) => {
    dispatch({
      type: types.ADD_PRODUCTS_TO_CART,
      product: product,
    });
  };
}

