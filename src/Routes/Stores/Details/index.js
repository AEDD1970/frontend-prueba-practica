import React, { useEffect, useState } from 'react'
import FormSimple from '../../../Components/Global/Forms/FormsSimple'
import style from "../stores.module.scss"
import { useNavigate, useParams } from 'react-router-dom';
import apiHelper from '../../../utils/api/AxiosHelper';
import { formatNameProducts, nameCity } from '../../../utils/logicBussines';
import ButtonSimple from '../../../Components/Global/Buttons/ButtonSimple';
import CreateStores from '../Create';

export default function DetailsStore() {
    const { id } = useParams();
    const [store, setStore] = useState({})
    const navigate = useNavigate();
    const [activeForm, setActiveform] = useState(false)
    const [storePdoducts, setStorePdoducts] = useState([])


    function handlePathPush(path) {
        navigate(path);
    }


    const getStore = () => {
        return apiHelper.get(`/stores/${id}`)
            .then(responseData => {
                const { data } = responseData
                console.log(responseData)
                setStore(data)
            })
            .catch(error => {
                const { response } = error
                console.log(response.data)
                return {
                    data: response.data,
                    status: response.status
                }
            });
    }

    const deleteStore = () => {
        return apiHelper.delete(`/stores/${id}`)
            .then(responseData => {
                const { data } = responseData
                console.log(responseData)
                setStore(data)
            })
            .catch(error => {
                const { response } = error
                console.log(response.data)
                return {
                    data: response.data,
                    status: response.status
                }
            });
    }

    const getProductsInStore = () => {
        return apiHelper.get(`/stock/products/stores`)
            .then(responseData => {
                const { data } = responseData
                const productsWhitStore = formatNameProducts(data, id)
                setStorePdoducts(productsWhitStore)
            })
            .catch(error => {
                const { response } = error
                return {
                    data: response.data,
                    status: response.status
                }
            });
    }

    console.log(storePdoducts)

    useEffect(() => {
        getStore()
    }, [])

    const handleDelete = () => {
        deleteStore()
        handlePathPush(`/Stores`)
    }

    const handleEdit = () => {
        setActiveform(true)
    }

    const handleGetStore = () => {
        getProductsInStore()
    }


    return (
        <div className={style.wrapperFormStores}>
            {!activeForm &&
                <React.Fragment>
                    <h2>Details of Store</h2>
                    <div className={style.wraperDetail}>
                        <p><b>Name of store: </b> {store.store?.name}</p>
                        <p><b>Data of create store: </b> {store.store?.dateCreate}</p>
                        <p><b>City of store: </b>{nameCity(store.store?.city)}</p>
                        <p><b>address of store: </b>{store.store?.address}</p>
                        {storePdoducts.length !== 0 &&
                            <div>
                                <p><b>------ Products ------</b></p>
                                {storePdoducts.map(item =>
                                    <div>
                                        <p><b>product: </b>{item?.label} | <b>stock: </b>{item?.stock}</p>
                                      
                                    </div>
                                )}

                            </div>
                        }
                    </div>
                    <div className={style.containerBtn}>
                        <ButtonSimple handleOnclick={() => handleEdit()}> Edit</ButtonSimple>
                        <ButtonSimple handleOnclick={() => handleDelete()} > Delete</ButtonSimple>
                        <ButtonSimple handleOnclick={() => handleGetStore()} > Products in store</ButtonSimple>

                    </div>
                </React.Fragment>
            }
            {activeForm &&
                <CreateStores data={store.store} method={"put"} id={id} />
            }

        </div>
    )
}
