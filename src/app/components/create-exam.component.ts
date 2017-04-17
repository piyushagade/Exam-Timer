import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'et-create-exam',
    templateUrl: '../html/create.html',
    styleUrls: ['../../assets/css/main.css'],
  animations: [

    // new exam panel animation
    trigger('newExamPanel', [
      transition('void => *', [
        style({
          transform: 'translateX(6%)',
          opacity: 0
        }),
        animate('200ms, ease-in-out')
      ])
    ])
  ]
})

export class CreateExamComponent{

    public newExamForm = this.fb.group({
      title: ['', Validators.required],
      course: ['', Validators.required],
      department: ['', Validators.required],
      professor: ['', Validators.required],
      duration: ['', Validators.required],
      calculator: ['', Validators.required],
      blanksheets: ['', Validators.required],
      number: ['', Validators.required]
    });

    @Input() panel;
    @Output() created = new EventEmitter();
    @Output() hide = new EventEmitter();

    constructor(public fb: FormBuilder){

    }

    onNewExamCreate($event){
      event.preventDefault();
      this.created.emit((this.newExamForm.value));
    }

    hidePanel(){
      this.hide.emit();
    }
}