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
        ]),

        trigger('icon', [
        transition(':enter', [   // :enter is alias to 'void => *'
            style({
            transform: 'scale(0.6)',
            opacity:0
            }),
            animate(300, style({
            transform: 'scale(1)',
            opacity:1
            })) 
        ]),
        transition(':leave', [   // :leave is alias to '* => void'
            animate(300, style({
            transform: 'scale(.6)',
            opacity:0
            })) 
        ])
        ]),
  ]
})

export class BegunComponent{
    @Input() panel;
    @Input() hours;
    @Input() minutes;
    @Input() seconds;
    @Input() timeup;
    @Input() announcements;
    @Output() delete = new EventEmitter();

    deleteAnnouncement(value){
        this.delete.emit(value);
    }
}