import axios from "axios";

function getUsersData(Url){
     return axios.get(Url)       
}


export function userLogin(url,data){
  return axios.post(url,data)       
}