import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/core';

@Component({
    selector: 'et-created-panel',
    templateUrl: '../html/created.html',
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

export class CreatedComponent{
    @Input() panel;
    @Output() instructions = new EventEmitter;
    @Output() begin = new EventEmitter;

    beginExam(){
        this.begin.emit();
    }


    showInstructions(){
        this.instructions.emit();
    }
}