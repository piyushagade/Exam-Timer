import { Component, trigger, transition, animate, style} from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'et-topbar',
    templateUrl: '../html/topbar.html',
    styleUrls: ['../css/main.css'],

    animations: [

    // topbar animation
    trigger('topbar', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('900ms, ease-in')
      ])
    ])

  ]
})

export class TopBarComponent{
    @Input() panel;
    @Output() reset = new EventEmitter;

    onReset(){
        this.reset.emit();
    }
}