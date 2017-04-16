import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/core';

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
    @Output() create = new EventEmitter;

    createExam(){
        this.create.emit();
    }
}