import React, { useEffect, useState } from 'react'
import CardSimple from '../../../Components/Global/Cards/CardSimple'
import style from '../stores.module.scss'
import apiHelper from '../../../utils/api/AxiosHelper'
import { useNavigate } from 'react-router-dom';
import ButtonSimple from '../../../Components/Global/Buttons/ButtonSimple';

export default function DashboardStores() {
    const navigate = useNavigate();

    const handleOnClik = (_id) => {
        handlePathPush(`/Stores/details/${_id}`)
    }

    const [pageNumber, setPageNumber] = useState(1)
    const [listStores, setListStores] = useState([])

    function handlePathPush(path) {
        navigate(path);
      }

      const getListStores = () => {
        return apiHelper.get(`/stores?limit=10&pageNumber=${pageNumber}` )
        .then(responseData => {
            const {data} = responseData
          console.log(responseData)
          setListStores(data)
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
        getListStores()
      },[])

      console.log(listStores)
    return (
        <div className={style.stores}>
            <div>
                <h2>Store</h2>
                <p>A virtual assistant view the stores on your list</p>
            </div>
            
            <div className={style.gridContainer}>
                <CardSimple handleOnClik={handleOnClik} data={listStores} />
            </div>
        </div>
    )
}
