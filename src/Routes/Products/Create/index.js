// File: MyForm.js
import React, { useState } from 'react';
import FormSimple from '../../../Components/Global/Forms/FormsSimple';
import style from '../products.module.scss'
import { useNavigate } from 'react-router-dom';
import apiHelper from '../../../utils/api/AxiosHelper';

const CreateProduct = ({ data, method, id}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: data?.name ||'',
    type: data?.type ||'',
    price: data?.price ||'',
  });

  const [errors, setErrors] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
    console.log(name)
    setFormData({
      ...formData,
      [name]: name === "price"? parseFloat(value): value,
    });
    setErrors("");
  };

  function handlePathPush(path) {
    navigate(path);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(method === "put"){
     await updateProduct(formData)
    }
    else{
      const response = await createProduct(formData)
      if([400, 404, 500].includes(response.status)){
        setErrors(response.data.message)
      }else{
        handlePathPush('/Products')
  
      }
    }
   
  };

  const createProduct= (formData) => {
    return apiHelper.post("/products", formData )
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
   
   const updateProduct = (formData) => {
     return apiHelper.patch(`/products/${id}`, formData)
         .then(responseData => {
             const { data } = responseData
             handlePathPush('/Products')      })
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
    name: "type",
    option: "select",
    optionsSelect: [
      {
        label: "PERECEDERO",
        value: "PERISHABLE"
      },
      {
        label: "NO PERECEDERO",
        value: "NONPERISHABLE"
      }
    ],
    value: formData.type,
    onChange: () => handleChange
  },
  {
    type: "number",
    name: "price",
    option: "input",
    value: formData.price,
    onChange: () => handleChange
  }
  ]


  return (
    <div className={style.wrapperFormCreateProduct}>
      <h2> {method === "put" ? "Edit Product": "Create Product"} </h2>
        <FormSimple  handleSubmit={handleSubmit} dataForm={dataForm} error={errors} />
    </div>
  );
};

export default CreateProduct;
