import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html'
})
export class UserInputComponent implements OnInit {
  @Input() header: string;
  @Output() submitClicked = new EventEmitter<number>();
  inputValue;
  isError = false;
  errorText = '';
  constructor() { }

  ngOnInit() {
  }

  onSubmitClick(inputValue) {
    if (inputValue && +inputValue !== 0) {
      this.isError = false;
      this.errorText = '';
      this.inputValue = '';
      this.submitClicked.emit(inputValue);
    } else {
      this.isError = true;
      this.errorText = 'Enter Valid Value.';
    }
  }

  showError(erroeText) {

  }

}
