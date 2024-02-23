import React, { useEffect, useState } from 'react'
import CardSimple from '../../../Components/Global/Cards/CardSimple'
import style from '../products.module.scss'
import apiHelper from '../../../utils/api/AxiosHelper';
import { useNavigate } from 'react-router-dom';
import ButtonSimple from '../../../Components/Global/Buttons/ButtonSimple';

export default function DashboardProducts() {
    const navigate = useNavigate();

    const handleOnClik = (_id) => {
        handlePathPush(`/Products/details/${_id}`)
    }

    const [pageNumber, setPageNumber] = useState(1)
    const [listProducts, setListProducts] = useState([])

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
      useEffect(()=>{
        getListSProducts()
      },[])

    return (
        <div className={style.products}>
            <div>
                <h2>Products</h2>
                <p>A virtual assistant view the products on your list</p>
            </div>
            <div className={style.gridContainer}>
                <CardSimple handleOnClik={handleOnClik} data={listProducts} />
            </div>
        </div>
    )
}
