import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/topbar.component';
import { HomeComponent } from './components/home.component';
import { CreateExamComponent } from './components/create-exam.component';
import { CreatedComponent } from './components/created.component';
import { InstructionsComponent } from './components/instructions.component';
import { BegunComponent } from './components/begun.component';
import { CreateAnnouncementComponent } from './components/create-announcement.component';
import { routing } from './app.routes';
import { TruncatePipe } from './pipes/truncate';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    CreateExamComponent,
    InstructionsComponent,
    CreatedComponent,
    BegunComponent,
    CreateAnnouncementComponent,
    TruncatePipe,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
