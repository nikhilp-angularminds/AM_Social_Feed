import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component'
import { AvatarModule } from 'ngx-avatars';
import { EditComponent } from './edit/edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ToastrModule } from 'ngx-toastr';
import { NgxSkeletonModule } from 'ngx-skeleton';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AvatarModule,
    NgbModule,
    InfiniteScrollModule,
    NgxSkeletonModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
