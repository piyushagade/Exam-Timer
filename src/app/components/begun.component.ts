import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/core';

@Component({
    selector: 'et-begun-panel',
    templateUrl: '../html/begun.html',
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

export class BegunComponent{
    @Input() panel;
    @Input() hours;
    @Input() minutes;
    @Input() seconds;
}