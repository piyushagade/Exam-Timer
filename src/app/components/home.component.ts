import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'et-home-panel',
    templateUrl: '../html/home.html',
    styleUrls: ['../../assets/css/main.css'],
    animations: [
    // panel animation
    trigger('movePanel', [
      transition('void => *', [
        style({
          transform: 'translateX(-10%)',
          opacity: 0
        }),
        animate('400ms, ease-in-out')
      ])
    ])
  ]

})

export class HomeComponent{
    @Input() panel;
    @Input() exams;
    @Output() create = new EventEmitter;
    @Output() create_cloud = new EventEmitter;


    public cloudForm = this.fb.group({
      code: ['', Validators.required],
    });

    constructor(public fb: FormBuilder){

    }

    createExam(){
        this.create.emit();
    }


    loadCloud(){
        this.create_cloud.emit(this.cloudForm.value);
    }
}