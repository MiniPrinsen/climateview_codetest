import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

const MULTIPLY_OPERATION = '*';
const DIVIDE_OPERATION = '/';
const SUBTRACT_OPERATION = '-';
const ADD_OPERATION = '+';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  calculateForm: any;
  title = 'calculator';
  result: number;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.calculateForm = this.formBuilder.group({
      input: '',
    });
  }

  onSubmit(data: any): void {
    this.calculate(data.input);
  }

  private calculate(expression: string) {
    const split = expression.split(' ');
    this.calculateByOperator(split, MULTIPLY_OPERATION);
    this.calculateByOperator(split, DIVIDE_OPERATION);
    this.calculateByOperator(split, SUBTRACT_OPERATION);
    this.calculateByOperator(split, ADD_OPERATION);
    this.result = +split[0];
  }

  private calculateByOperator(equation: Array<number | string>, operator: string): void {
    let index = equation.indexOf(operator);
    while (index !== -1) {
      switch (operator) {
        case MULTIPLY_OPERATION: {
          equation.splice(index - 1, 3, +equation[index - 1] * +equation[index + 1]);
          break;
        }
        case DIVIDE_OPERATION: {
          equation.splice(index - 1, 3, +equation[index - 1] / +equation[index + 1]);
          break;
        }
        case SUBTRACT_OPERATION: {
          equation.splice(index - 1, 3, +equation[index - 1] - +equation[index + 1]);
          break;
        }
        case ADD_OPERATION: {
          equation.splice(index - 1, 3, +equation[index - 1] + +equation[index + 1]);
          break;
        }
      }
      index = equation.indexOf(operator);
    }
  }
}
