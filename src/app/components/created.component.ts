import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/core';

@Component({
    selector: 'et-created-panel',
    templateUrl: '../html/created.html',
    styleUrls: ['../../assets/css/main.css'],
    animations: [
        trigger('movePanel', [
            transition('void => *', [
                style({
                transform: 'translateX(-6%)',
                opacity: 0
                }),
                animate('200ms, ease-in-out')
            ])
        ])
    ]
})

export class CreatedComponent{
    @Input() panel;
    @Input() title;
    @Input() newExamCode;
    @Output() instructions = new EventEmitter;
    @Output() begin = new EventEmitter;

    beginExam(){
        this.begin.emit();
    }


    showInstructions(){
        this.instructions.emit();
    }
}