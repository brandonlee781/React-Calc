import React from 'react';
import { render } from 'react-dom';

import style from './App.styl';
import NumberPad from './components/NumberPad/NumberPad';
import Display from './components/Display/Display';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      equation: [],
      result: ''
    }
    this.clickKey = this.clickKey.bind(this);
    this.checkDecimals = this.checkDecimals.bind(this);
    this.solveEquation = this.solveEquation.bind(this);
  }
  render() {
    return (
      <div className={style.container}>
        <Display equation={this.state.equation} result={this.state.result}/>
        <NumberPad clickKey={this.clickKey}/>
      </div>
    )
  }

  clickKey(val) {
    let equation = this.state.equation;
    if (val === 'DEL') {
      let removed = equation.pop()
      this.setState({equation:equation});
    } else if (val === '=') {
      let result = this.state.result;
      this.setState({equation: [result],result: ''});
    } else if (val !== '=' && val !== 'DEL') {
      // cannot have 2 functions in a row
      if ((typeof val !== 'number' && val !== '.') && (typeof equation[equation.length-1] !== 'number' && equation[equation.length-1] !== '.')) return;

      // cannot have 2 decimals in a row
      if (val === '.' && equation[equation.length-1] === '.') return;
      if (!this.checkDecimals(equation)) return;

      // if operator is preceded by a decimal, remove the decimal
      if ((val == '+'||val == '-'||val == 'x'||val == '÷') && equation[equation.length-1] == '.') {
        let removed = equation.pop();
        equation.push(val);
        this.setState({equation: equation});
        return;
      }

      // if operator is used, solve equation after next number
      if (equation.length > 1 && typeof val === 'number') {
        equation.push(val);
        let result = eval(equation.join(''));
        this.setState({equation: equation,result: result});
        return;
      }

      // cannot have 2 decimals in the same number
      equation.push(val)
      this.setState({equation:equation});
    }
  }

  checkDecimals(arr) {
    let count = 0;
    for (let i = arr.length;i > -1;i--) {
      let curChar = arr[i];
      if (curChar === '.') count++;
      if (curChar == '+'||curChar == '-'||curChar == '*'||curChar == '/') count=0;
    }
    if (count > 1) return false;
    return true;
  }

  solveEquation() {
    const fullEq = this.state.equation.join(' ');
    let result = eval(fullEq);
    this.setState({result: result});
  }
}

render(<App/>,document.getElementById('root'));
