import {
  Component,
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
 } from '@angular/core';

 import { FormBuilder, Validators } from '@angular/forms';
 import { ReactiveFormsModule } from '@angular/forms';
 import { Http } from '@angular/http';
 import { Observable } from "rxjs/Rx";


@Component({
  selector: 'app-root',
  templateUrl: './html/main.html',
  styleUrls: ['./css/main.css'],
  animations: [

    // new exam panel animation
    trigger('newExamPanel', [
      state('hidden', style({
        // transform: 'scale(0.82)',
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('create', style({
        // transform: 'scale(1)',
        transform: 'translateX(0%)',
        opacity: 1
      })),
      transition('hidden => create', animate('200ms ease-in')),
      transition('create => hidden', animate('200ms ease-out'))
    ]),

    // curtain
    trigger('curtainPanel', [
      state('hidden', style({
        // transform: 'scale(0.82)',
        // transform: 'translateX(-100%)',
        opacity: 0
      })),
      state('visible', style({
        // transform: 'scale(1)',
        // transform: 'translateX(0%)',
        opacity: 0.97
      })),
      transition('hidden => create', animate('200ms ease-in')),
      transition('create => hidden', animate('200ms ease-out'))
    ]),

    // button animation
    trigger('movePanel', [
      transition('void => *', [
        style({
          // transform: 'translatey(-100%)',
          opacity: 0
        }),
        animate('1400ms, ease-in')
      ])
    ]),

    //topbar animation
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




export class AppComponent {
  panel = 'home';
  duration: number;
  elapsed: number;
  title: string;
  course: string;
  number: string;
  professor: string;
  department: string;
  calculator: string;
  blanksheets: string;
  last5mins: boolean;


  object;
  observable;
  subscription;

   private eventDate: Date = new Date(2018, 9, 22);

    private diff: number;
    private countDownResult: number;
    private days: number;
    private hours: number;
    private minutes: number;
    private seconds: number;


  public newExamForm = this.fb.group({
    title: ['', Validators.required],
    course: ['', Validators.required],
    department: ['', Validators.required],
    professor: ['', Validators.required],
    duration: ['', Validators.required],
    calculator: ['', Validators.required],
    blanksheets: ['', Validators.required],
    number: ['', Validators.required]
  });


  constructor(public fb: FormBuilder, public http: Http){
    this.object = {data: []};
    this.elapsed = 0;


  }

  createExam(){
        this.panel = 'create';
  }


  hidePanel(){
        if(this.panel === 'instructions'){
          this.panel = 'created';
        }
        else {
          this.panel = 'home';
        }
  }

  onNewExamCreate(event){
    // set object
    this.object.data[0] = (this.newExamForm.value);

    // hide hidePanel
    this.panel = 'created';

    this.duration = this.object.data[0].duration;
    this.course = this.object.data[0].course;
    this.calculator = this.object.data[0].calculator;
    this.blanksheets = this.object.data[0].blanksheets;
    this.title = this.object.data[0].title;
    this.number = this.object.data[0].number;
    this.professor = this.object.data[0].professor;
    this.department = this.object.data[0].department;
    console.log(this.newExamForm.value);
  }



  beginExam(){
    this.panel = 'begun';

    //start timer
    this.observable = Observable.interval(1000).map((x) => {
                          this.diff = Math.floor((this.duration * 60 - this.elapsed));
                      });

    this.subscription = this.observable.subscribe((x) => {
                            this.elapsed++;
                            this.days = this.getDays(this.diff);
                            this.hours = this.getHours(this.diff);
                            this.minutes = this.getMinutes(this.diff);
                            this.seconds = this.getSeconds(this.diff);

                            if(this.days === 0 && this.hours === 0 && this.minutes === 0 && this.seconds === 0) {
                              this.subscription.unsubscribe();
                              this.last5mins = false;
                            }

                            if(this.days === 0 && this.hours === 0 && this.minutes === 5) {
                              this.last5mins = true;
                            }
                        });

  }


  showInstructions(){
    this.panel = 'instructions';
  }

    getDays(t){
        var days;
        days = Math.floor(t / 86400);

        return days;
    }

    getHours(t){
        var days, hours;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600) % 24;

        return hours;
    }

    getMinutes(t){
        var days, hours, minutes;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600) % 24;
        t -= hours * 3600;
        minutes = Math.floor(t / 60) % 60;

        return minutes;
    }

    getSeconds(t){
        var days, hours, minutes, seconds;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600) % 24;
        t -= hours * 3600;
        minutes = Math.floor(t / 60) % 60;
        t -= minutes * 60;
        seconds = t % 60;

        return seconds;
    }

    resetTimer(){
      this.panel = 'home';
      this.subscription.unsubscribe();
      this.elapsed = 0;
      this.last5mins = false;
    }

}
