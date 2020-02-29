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
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterComponent } from './register/register.component';





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
  /*  RegisterFormComponent,
    RegisterFormComponent*/
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      [
        {
          path: 'maps',
          component: GooglemapsComponent
        },
        {
          path: '',
          component: HomeComponent
        },

     /*   {
          path: 'register',
          component: RegisterComponent
        },*/
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
       
       
        // otherwise redirect to home
        { path: '**', redirectTo: '' }
      ]
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
