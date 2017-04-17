import { Component, trigger, transition, animate, style} from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    @Input() announce;
    @Input() viewip;
    @Output() close_announcement = new EventEmitter;
    @Output() reset = new EventEmitter;
    @Output() create_announcement = new EventEmitter;
    @Output() publish_announcement = new EventEmitter;
    @Output() view = new EventEmitter;


    public announcementForm = this.fb.group({
      announcement: ['', Validators.required],
      question_announcement: ['', Validators.required]
    });

    constructor(public fb: FormBuilder){}

    onReset(){
      this.reset.emit();
    }

    // show announcement box
    createAnnouncement(){
      this.create_announcement.emit();
    }

    // close announcement box
    closeAnnouncement(){
      this.close_announcement.emit();
    }

    // publish announcement
    publishAnnouncement($event){
      event.preventDefault();
      this.publish_announcement.emit(this.announcementForm.value);
    }

    // switch view
    switchView(){
      this.view.emit(this.announcementForm.value);
    }
}