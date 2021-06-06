import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.css']
})
export class InputErrorsComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() existingField: string;

  constructor() { }

  ngOnInit(): void {
  }

  get showErrors(): boolean {
    const { invalid, touched, dirty } = this.control;
    return invalid && (touched || dirty);
  }

}
