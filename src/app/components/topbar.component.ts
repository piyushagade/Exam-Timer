import { Component, trigger, transition, animate, style} from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'et-topbar',
    templateUrl: '../html/topbar.html',
    styleUrls: ['../../assets/css/main.css'],

    animations: [

    // topbar animation
    trigger('topbar', [
      transition('void => *', [
        style({
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


    trigger('logo', [
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
        animate(0, style({
          transform: 'scale(.6)',
          opacity:0
        })) 
      ])
    ])

  ]
})

export class TopBarComponent{
    @Input() panel;
    @Input() course;
    @Input() number;
    @Output() reset = new EventEmitter;
    @Output() create_announcement = new EventEmitter;

    onReset(){
      this.reset.emit();
    }

    createAnnouncement(){
      this.create_announcement.emit();
    }
}