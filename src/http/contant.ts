
export const ContentTypeEnum =  {
  // json
  JSON : 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED : 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA : 'multipart/form-data;charset=UTF-8',
}

export const RequestEnum  = {
  GET :'GET',
  POST: 'POST',
  PUT : 'PUT',
  DELETE : 'DELETE',
}

export const ResultEnum = {
  SUCCESS :0,
  ERROR :1,
  TIMEOUT :401,
  TYPE :'success',
}