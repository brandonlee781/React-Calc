import React from 'react';

import style from './Button.styl';

const Button = ({val,clickKey}) => (
  <div className={style.btn} onClick={clickKey.bind(null,val)}>
    <span className={style.num}>{val}</span>
  </div>
)

export default Button;
