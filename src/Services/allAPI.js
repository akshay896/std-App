import commonAPI from "./commonAPI";
import SERVER_URL from "./server_url";

export const addDetailsAPI =async(Details)=>{
return await  commonAPI("POST",`${SERVER_URL}/allDetails`,Details)
}

export const getAllDetailsAPI =async ()=>{
 return await commonAPI("GET",`${SERVER_URL}/allDetails`,"")
}

export const removeDetailsAPI = async(stdID)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/allDetails/${stdID}`,{})
}

export const updateDetailsAPI = async (stdID ,updatedDetails)=>{
  return await commonAPI("PUT",`${SERVER_URL}/allDetails/${stdID}`,updatedDetails)
}