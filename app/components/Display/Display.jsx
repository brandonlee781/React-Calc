import React from 'react'

import style from './Display.styl';

const Display = ({equation,result}) => (
  <div className={style.display}>
    <div className={style.mainDisplay}><span>{equation}</span></div>
    <div className={style.subDisplay}><span>{result}</span></div>
  </div>
)

export default Display;
