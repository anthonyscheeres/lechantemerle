import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { FotoComponent } from './foto/foto.component';
import { VideoComponent } from './video/video.component';
import { IndelingComponent } from './indeling/indeling.component';
import { KenmerkenComponent } from './kenmerken/kenmerken.component';
import { OmschrijvingComponent } from './omschrijving/omschrijving.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HuisComponent } from './huis/huis.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterComponent } from './register/register.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopUpComponent } from './pop-up/pop-up.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddPendingReservationComponent } from './add-pending-reservation/add-pending-reservation.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ContactSubComponent } from './contact-sub/contact-sub.component';
import { AcceptReservationComponent } from './accept-reservation/accept-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactComponent,
    FotoComponent,
    VideoComponent,
    IndelingComponent,
    KenmerkenComponent,
    OmschrijvingComponent,
    HomeComponent,
    FooterComponent,
    HuisComponent,
    HeaderComponent,
    GooglemapsComponent,
    LoginFormComponent,
    LoginComponent,
    RegisterComponent,
    RegFormComponent,
    ReservationComponent,
    RoomsComponent,
    PopUpComponent,
    AddPendingReservationComponent,
    ProfileComponent,
    ReservationsComponent,
    ContactSubComponent,
    AcceptReservationComponent,


   

  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(
      [

       
             {
          path: 'reservations',
          component: ReservationsComponent
        },
          {
          path: 'register',
          component: RegisterComponent
        },
        {
          path: 'profile',
          component: ProfileComponent
        },

        {
          path: 'maps',
          component: GooglemapsComponent
        },
        {
          path: '',
          component: HomeComponent
        },

 
        {
          path: 'contact',
          component: ContactComponent
        },
        {
          path: 'foto',
          component: FotoComponent
        }, {
          path: 'video',
          component: VideoComponent
        }, {
          path: 'indeling',
          component: IndelingComponent
        }, {
          path: 'kenmerken',
          component: KenmerkenComponent
        }, {
          path: 'omschrijving',
          component: OmschrijvingComponent
        }, {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'kamers',
          component: RoomsComponent
        },
       
        // otherwise redirect to home
        { path: '**', redirectTo: '' }
      ]
    ),
  ],
  providers: [{
    provide: LocationStrategy, useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent],
  entryComponents: [PopUpComponent]
})
export class AppModule { }
