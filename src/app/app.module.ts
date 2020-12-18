import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { environment } from './../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './core/components/login/login.component';

import { ProductsComponent } from './shopping/components/products/products.component';

import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([

      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent }




    ])
  ],
  providers: [


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
