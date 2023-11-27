import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PersonalAreaComponent } from './personal-area/personal-area.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { InfoVilaComponent } from './info-vila/info-vila.component';
import { CardVillaComponent } from './card-villa/card-villa.component';
import { ListVillaComponent } from './list-villa/list-villa.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertDialogComponent,
    UserRegistrationComponent,
    MenuComponent,
    LoginComponent,
    SignupComponent,
    PersonalAreaComponent,
    InfoVilaComponent,
    CardVillaComponent,
    ListVillaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatMenuModule,
    

  
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
