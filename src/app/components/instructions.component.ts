import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/core';

@Component({
    selector: 'et-instructions-panel',
    templateUrl: '../html/instructions.html',
    styleUrls: ['../../assets/css/main.css'],
    animations: [
        // panel animation
        trigger('movePanel', [
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

export class InstructionsComponent{
    @Input() panel;
    @Input() calculator;
    @Input() blanksheets;
    @Input() duration;
    @Output() close = new EventEmitter;

    closeInstructions(){
        this.close.emit();
    }
}