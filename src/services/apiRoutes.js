export const BASE_URL = 'http://localhost:5000';

export const API_ROUTES = {
  LOGIN: '/auth/login',

  REGISTER_SELLER: '/auth/seller/register',
  UPDATE_SELLER_PROFILE:"auth/updateprofile",

  GET_ALL_SELLER_PRODUCTS: '/api/products/seller/my-products',
  GET_PARTICULAR_PRODUCT:"/api/products/selleroneproduct",
  ADD_PRODUCT:'/api/products/seller',
    UPDATE_PRODUCT:'/api/products/seller',
  DELETE_PRODUCT:"/api/products/seller",
  FETCH_ORDERS:"/api/orders/seller",
    FETCH_ORDERS_BY_ID:"/api/orders/seller",
  UPDATE_ORDER_STATUS:"/api/orders/seller/status",
  ALL_SELLER_REVIEWS:"/api/review/seller/my-products",
  BRAND_REQUEST:"/api/brand/request",
  ALL_BRAND:"/api/brand/all",
  CREATE_TICKET:"/api/support/create",
  CREATE_COMBOPRODUCT:"/api/products/combo/create",
  CREATE_TICKET:"/api/support/create",
  All_TICKET:"/api/support/my-tickets"

};
