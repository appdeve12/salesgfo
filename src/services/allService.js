import axiosInstance from './axiosInstance';
import { API_ROUTES } from './apiRoutes';

export const loginUser = (data) => {
  return axiosInstance.post(API_ROUTES.LOGIN, data);
};

export const registerSeller = (data) => {
  return axiosInstance.post(API_ROUTES.REGISTER_SELLER, data);
};

export const updatesellerprofile = (data) => {
  return axiosInstance.put(API_ROUTES.UPDATE_SELLER_PROFILE, data)
}
export const getallsellerproduct = () => {
  return axiosInstance.get(API_ROUTES.GET_ALL_SELLER_PRODUCTS)
} 
export const fetchparticularsellerproduct = (id) => {
  return axiosInstance.get(`${API_ROUTES.GET_PARTICULAR_PRODUCT}/${id}`)
}
export const addproduct=(data)=>{
  return axiosInstance.post(API_ROUTES.ADD_PRODUCT,data)
}
export const updateproduct=(data,id)=>{
  return axiosInstance.put(`${API_ROUTES.UPDATE_PRODUCT}/${id}`,data)
}
export const deleteorarchivedproduct=(id)=>{
  return axiosInstance.delete(`${API_ROUTES.UPDATE_PRODUCT}/${id}`)
}
export const fetchallorderwithqueriesparameter=(queryparameter={})=>{
  return axiosInstance.get(API_ROUTES.FETCH_ORDERS,{
    params:queryparameter
  })

}
export const updateorderstatus=(data,orderId)=>{
  return axiosInstance.patch(`${API_ROUTES.UPDATE_ORDER_STATUS}/${orderId}`,data)
}
export const getsinglesellerrrder=(id)=>{
  return axiosInstance.get(`${API_ROUTES.FETCH_ORDERS_BY_ID}/${id}`)
}
export const allreviews=()=>{
  return axiosInstance.get(API_ROUTES.ALL_SELLER_REVIEWS)
}
export const reportReview = async (reviewId, reason) => {
  return axiosInstance.post(`/api/review/report/${reviewId}`, { reason });
};
export const brandrequest=(data)=>{
   return axiosInstance.post(API_ROUTES.BRAND_REQUEST,data)
}
export const allbrands=()=>{
  return axiosInstance.get(API_ROUTES.ALL_BRAND)
}
export const createTicket=(data)=>{
  return axiosInstance.post(API_ROUTES.CREATE_TICKET,data)
}
export const addcomboproduct=(data)=>{
  return axiosInstance.post(API_ROUTES.CREATE_COMBOPRODUCT,data)
}
export const supportTicket=(data)=>{
return axiosInstance.post(API_ROUTES.CREATE_TICKET,data)
}
export const sellerallticket=()=>{
  return axiosInstance.get(API_ROUTES.All_TICKET)
}