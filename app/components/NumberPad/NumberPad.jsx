import React from 'react';

import style from './NumberPad.styl';
import Button from '../Button/Button';

const nums = [1,2,3,4,5,6,7,8,9,'.',0,'='];
const funcs = ['DEL','/','*','-','+']

const NumberPad = ({clickKey}) => (
  <div className={style.pad}>
    <div className={style.numPad}>
      {nums.map((val) => (<Button key={val} val={val} clickKey={clickKey}/>))}
    </div>
    <div className={style.funcPad}>
      {funcs.map((val) => (<Button key={val} val={val} clickKey={clickKey}/>))}
    </div>
  </div>
)

export default NumberPad;
