import React from "react";
import style from "./cardSimple.module.scss";
import ButtonCricle from "../../Buttons/ButtonCircle";
import { cutoutLetters } from "../../../../utils/logicBussines";

export default function CardSimple({handleOnClik, data=[]}) {
  if(!data.length) return(
    <div><h1>No have Data</h1></div>
  )
 
  return (
    <React.Fragment>
      {data.map((item) => (
        <div className={style.wrapperCard} id="columna" key={item.name}>
          <div className={style.cardImg} >
            <img
              src={item.img}
              alt={item.name}
            />
          </div>
          <div className={style.contentProduct}>
            <h3>{cutoutLetters(item.name) }</h3>
            <div className={style.containerPrice}>
              {item.price && <p className={style.price}>Cop {item.price.toLocaleString()}</p>}
              {item.address && <p className={style.price}>{cutoutLetters(item.address)}...</p>}
              <ButtonCricle handleOnClik={() => handleOnClik(item._id)}>
                i
              </ButtonCricle>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
