import React, { useEffect, useState } from 'react'
import style from "../products.module.scss"
import { useNavigate, useParams } from 'react-router-dom';
import apiHelper from '../../../utils/api/AxiosHelper';
import ButtonSimple from '../../../Components/Global/Buttons/ButtonSimple';
import CreateProduct from '../Create';

export default function DetailsProduct() {
    const { id } = useParams();
    console.log(id)
    const [product, setProduct] = useState({})
    const navigate = useNavigate();
    const [activeForm, setActiveform] = useState(false)


    function handlePathPush(path) {
        navigate(path);
    }


    const getProducts = () => {
        return apiHelper.get(`/products/${id}`)
            .then(responseData => {
                const { data } = responseData
                console.log(responseData)
                setProduct(data)
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

    const deleteProduct = () => {
        return apiHelper.delete(`/products/${id}`)
            .then(responseData => {
                const { data } = responseData
             
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

    useEffect(() => {
        getProducts()
    }, [])

    const handleDelete = () => {
        deleteProduct()
        handlePathPush(`/Products`)
    }

    const handleEdit = () => {
        setActiveform(true)
    }

    return (
        <div className={style.wrapperFormCreateProduct}>
            {!activeForm &&
                <React.Fragment>
                     <h2>Details of Product</h2>
                    <div className={style.wraperDetail}>
                        <p><b>Name of product: </b> {product.product?.name}</p>
                        <p><b>Data of create product: </b> {product.product?.dateCreate}</p>
                        <p><b>price of product: </b>{product.product?.price.toLocaleString()}</p>
                        <p><b>type of product: </b>{product.product?.type}</p>
                    </div>
                    <div className={style.containerBtn}>
                        <ButtonSimple handleOnclick={() => handleEdit()}> Edit</ButtonSimple>
                        <ButtonSimple handleOnclick={() => handleDelete()} > Delete</ButtonSimple>
                    </div>
                </React.Fragment>
            }
            {activeForm &&
                <CreateProduct data={product.product} method={"put"} id={id}/>
            }

        </div>
    )
}
