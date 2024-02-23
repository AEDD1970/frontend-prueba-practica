import React from 'react'
import style from './buttonCircle.module.scss'

export default function ButtonCricle({children, handleOnClik}) {
  return (
    <button onClick={handleOnClik} className={style.circle}>
        {children}
    </button>
  )
}
