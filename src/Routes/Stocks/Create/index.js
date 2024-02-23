// File: MyForm.js
import React, { useEffect, useState } from 'react';
import FormSimple from '../../../Components/Global/Forms/FormsSimple';
import style from '../stocks.module.scss'
import { useNavigate } from 'react-router-dom';
import apiHelper from '../../../utils/api/AxiosHelper';
import { formatDataSelect } from '../../../utils/logicBussines';

const CreateStock = ({ data, method, id}) => {
  
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    stock: data?.stock || '',
    product:  data?.product || '',
    store: data?.store || '',
  });

  const [errors, setErrors] = useState("");
  const [pageNumber, setPageNumber] = useState(1)
  const [listProducts, setListProducts] = useState([])
  const [listStores, setListStores] = useState([])
  
  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stock"? parseInt(value): value
    });
    setErrors("");

  };

  
  function handlePathPush(path) {
    navigate(path);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createstock(formData)
    if([400, 404, 500].includes(response.status)){
      setErrors(response.data.message)
    }else{
      handlePathPush('/Products')

    }
   
  };

const createstock = (formData) => {
  const { stock, product, store } = formData
 return apiHelper.post(`/stock/products/${product}/stores/${store}`, {stock })
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



function handlePathPush(path) {
    navigate(path);
  }

  const getListSProducts = () => {
    return apiHelper.get(`/products?limit=10&pageNumber=${pageNumber}` )
    .then(responseData => {
        const {data} = responseData
      console.log(responseData)
      setListProducts(data)
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

  const getListStores = () => {
    return apiHelper.get(`/stores?limit=10&pageNumber=${pageNumber}` )
    .then(responseData => {
        const {data} = responseData
      setListStores(data)
    })
    .catch(error => {
      const {response } = error
      return {
        data: response.data,
        status: response.status
      }
    });
  }

  useEffect(()=>{
    getListSProducts()
    getListStores()
  },[])

  const dataForm = [{
    type: "number",
    option: "input",
    name: "stock",
    value: formData.stock,
    onChange: () => handleChange
},
{
    type: "text",
    name: "product",
    option: "select",
    optionsSelect: formatDataSelect(listProducts),
    value: formData.product,
    onChange: () => handleChange 
},
{
  type: "text",
  name: "store",
  option: "select",
  optionsSelect: formatDataSelect(listStores),
  value: formData.store,
  onChange: () => handleChange 
},
]


  return (
    <div className={style.wrapperFormCreateStocks}>
        <h2> {method === "put" ? "Edit Store": "Add Stocks"} </h2>
        <FormSimple  handleSubmit={handleSubmit} dataForm={dataForm} error={errors} />
    </div>
  );
};

export default CreateStock;
