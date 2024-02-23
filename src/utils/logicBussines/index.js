import { countries } from "../countries/_ISO-countries";

export const cutoutLetters = (letters) => {
    return letters.slice(0, 14);
}

export const nameCity = (codeCity) => {
   return countries.find(item => item.value === codeCity)?.label || ""
}


export const formatDataSelect = (data) => {
    return data.map(item => {
        return {
            label: item.name,
            value: item._id
        }
    })
 }

 export const formatNameProducts = (data, _id) =>{
    return data.filter(item => item._id === _id).map(item => {
        return {
            label: item.name,
            stock: item.stock
        }
    })
 }