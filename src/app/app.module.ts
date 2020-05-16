import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from './../environments/environment';

import { AppComponent } from "./app.component";

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { MaterialModule } from './shared/modules/material/material.module';
import { LayoutModule } from './shared/modules/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      timeOut: 5000,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    LayoutModule,
  ],
  providers: [
    {
      provide: StorageBucket,
      useValue: "gs://resource-manager-3f1c8.appspot.com",
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
