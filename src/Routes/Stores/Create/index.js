// File: MyForm.js
import React, { useState } from 'react';
import FormSimple from '../../../Components/Global/Forms/FormsSimple';
import style from '../stores.module.scss'
import { useNavigate } from 'react-router-dom';
import { countries } from '../../../utils/countries/_ISO-countries';
import apiHelper from '../../../utils/api/AxiosHelper';

const CreateStores = ({ data, method, id}) => {
  
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: data?.name || '',
    city:  data?.city || '',
    address: data?.address || '',
  });

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors("");

  };

  
  function handlePathPush(path) {
    navigate(path);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(method === "put"){
      const response = await updateStore(formData)
    }
    else{
      const response = await createStore(formData)
      if([400, 404, 500].includes(response.status)){
        setErrors(response.data.message)
      }else{
        handlePathPush('/Stores')
  
      }
    }
   
  };

 

const createStore = (formData) => {
 return apiHelper.post("/stores", formData )
  .then(responseData => {
    console.log(responseData)
    return responseData
  })
  .catch(error => {
    const {response } = error
    console.log(response.data)
    return {
      data: response.data,
      status: response.status
    }
  });
}

const updateStore = (formData) => {
  return apiHelper.patch(`/stores/${id}`, formData)
      .then(responseData => {
          const { data } = responseData
          handlePathPush('/Stores')      })
      .catch(error => {
          const { response } = error
          console.log(response.data)
          return {
              data: response.data,
              status: response.status
          }
      });
}

  const dataForm = [{
    type: "text",
    option: "input",
    name: "name",
    value: formData.name,
    onChange: () => handleChange
},
{
    type: "text",
    name: "city",
    option: "select",
    optionsSelect: countries,
    value: formData.city,
    onChange: () => handleChange 
},
{
    type: "text",
    name: "address",
    option: "input",
    value: formData.address,
    onChange: () => handleChange 
}
]


  return (
    <div className={style.wrapperFormStores}>
        <h2> {method === "put" ? "Edit Store": "Create Store"} </h2>
        <FormSimple  handleSubmit={handleSubmit} dataForm={dataForm} error={errors} />
    </div>
  );
};

export default CreateStores;
