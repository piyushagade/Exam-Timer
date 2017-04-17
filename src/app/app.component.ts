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
 import { Observable } from 'rxjs/Rx';
 import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './html/main.html',
  styleUrls: ['../assets/css/main.css'],
  animations: [
    // button animation
    trigger('movePanel', [
      transition('void => *', [
        style({
          // transform: 'translateY(-100%)',
          opacity: 0
        }),
        animate('1400ms, ease-in')
      ])
    ]),

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
  logo_state: string;
  last5mins: boolean;
  timeup: boolean;
  announce: boolean;
  view: boolean;
  object;
  announcements;
  observable;
  subscription;

  private eventDate: Date = new Date(2018, 9, 22);
  private diff: number;
  private countDownResult: number;
  private days: number;
  private hours: number;
  private minutes: number;
  private seconds: number;

  newExamCode: number;

  dev: boolean = true;

  // firebase
  items: FirebaseListObservable<any[]>;
  objects: FirebaseObjectObservable<any>;
  exams;

  constructor(public fb: FormBuilder, public http: Http, private af: AngularFire){
    this.object = {data: []};
    this.announcements = {data: []};
    this.elapsed = 0;
    this.announce = false;
    this.timeup = false;
    this.view = true;

    this.items = af.database.list('/exams');
    this.objects = af.database.object('/exams', { preserveSnapshot: true });

    // retriving snapshot
    this.objects.subscribe(snapshot => {
      this.exams = snapshot.val();
    });
  }

  // show create new exam panel
  createExam(){
    this.panel = 'create';
    this.logo_state = 'big';
  }

  // show create new exam panel
  loadCloud(value){
    // console.log(this.exams[value.code]);


      console.log('load cloud ' + this.exams[value.code]);

      // set data
      if(this.exams[value.code] !== undefined){
        this.duration = this.exams[value.code].duration;
        this.course = this.exams[value.code].course;
        this.calculator = this.exams[value.code].calculator;
        this.blanksheets = this.exams[value.code].blanksheets;
        this.title = this.exams[value.code].title;
        this.number = this.exams[value.code].number;
        this.professor = this.exams[value.code].professor;
        this.department = this.exams[value.code].department;

        this.newExamCode = value.code;
        this.panel = 'created';
      }
  }

  // hide panel
  hidePanel(){
    if(this.panel === 'instructions'){
      this.panel = 'created';
    }
    else {
      this.panel = 'home';
    }
    this.logo_state = 'big';
  }

  onNewExamCreate(value){
    // set object
    this.object.data[0] = value;

    console.log('onclick' + this.object.data[0]);

    // hide hidePanel
    this.panel = 'created';

    // set data
    this.duration = this.object.data[0].duration;
    this.course = this.object.data[0].course;
    this.calculator = this.object.data[0].calculator;
    this.blanksheets = this.object.data[0].blanksheets;
    this.title = this.object.data[0].title;
    this.number = this.object.data[0].number;
    this.professor = this.object.data[0].professor;
    this.department = this.object.data[0].department;

    // set firebase entry
    this.newExamCode = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    this.objects.update({ [this.newExamCode]: value});
  }


  // show begun panel
  beginExam(){
    this.panel = 'begun';
    this.logo_state = 'small';

  // start timer
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

      if(this.days === 0 && this.hours === 0 && this.minutes === 0 && this.seconds === 0) {
        this.timeup = true;
      }
    });
  }


  showInstructions(){
    this.panel = 'instructions';
  }

  // timer functions
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

  // reset timer
  resetTimer(){
    this.panel = 'home';
    if(this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
    else{
      // delete firebase entry
      // this.objects.update({ [this.newExamCode]: null});
    }
    this.elapsed = 0;
    this.last5mins = false;
    this.timeup = false;
    
    
    // reset data
    this.duration = null;
    this.course = null;
    this.calculator = null;
    this.blanksheets = null;
    this.title = null;
    this.number = null;
    this.professor = null;
    this.department = null;

    // set firebase entry
    this.newExamCode = null;
  }

  // show create announcement panel
  createAnnouncement(){
        this.announce = true;
  }

  // close announcement
  closeAnnouncement(){
      this.announce = !this.announce;
  }

  publish_announcement(value){
    this.announcements.data.push(value);
    console.log(JSON.stringify(this.announcements));
  }

  // delete announcement
  deleteAnnouncement(value){
    this.announcements.data.splice(value, 1);
  }

  //switch view
  switchView(){
    this.view = !this.view;
  }

}
