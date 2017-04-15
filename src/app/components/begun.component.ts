import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/core';

@Component({
    selector: 'et-begun-panel',
    templateUrl: '../html/begun.html',
    styleUrls: ['../../assets/css/main.css'],
    animations: [
        // button animation
        trigger('movePanel', [
            transition('void => *', [
                style({
                // transform: 'translatey(-100%)',
                opacity: 0
                }),
                animate('1400ms, ease-in')
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