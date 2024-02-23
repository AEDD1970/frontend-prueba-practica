import React from 'react'
import style from './buttonSimple.module.scss'

export default function ButtonSimple({ children, handleOnclick }) {
    return (
        <button className={style.btnSimple} onClick={handleOnclick}>{children}</button>
    )
}
