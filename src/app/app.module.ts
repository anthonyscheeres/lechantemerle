import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { FotoComponent } from './foto/foto.component';
import { VideoComponent } from './video/video.component';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { IndelingComponent } from './indeling/indeling.component';
import { KenmerkenComponent } from './kenmerken/kenmerken.component';
import { OmschrijvingComponent } from './omschrijving/omschrijving.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HuisComponent } from './huis/huis.component';
import { HeaderComponent } from './header/header.component';
import { BackgroundComponent } from './background/background.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactComponent,
    FotoComponent,
    VideoComponent,
    GooglemapsComponent,
    IndelingComponent,
    KenmerkenComponent,
    OmschrijvingComponent,
    HomeComponent,
    FooterComponent,
    HuisComponent,
    HeaderComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      [
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
          path: 'register',
          component: GooglemapsComponent
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

        // otherwise redirect to home
        { path: '**', redirectTo: '' }
      ]
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
