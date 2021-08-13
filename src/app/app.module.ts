import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { AppRoutingModule, components } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CategoryService } from './category.service';
import { CategoriesMenuComponent } from './store/categories-menu/categories-menu.component';
import { ShippingComponent } from './check-out/shipping/shipping.component';
import { OrderHistoryComponent } from './check-out/order-history/order-history.component';
import { FooterComponent } from './footer/footer.component';
import { CartOperationComponent } from './shared-component/cart-operation/cart-operation.component';
import { LoadingComponent } from './shared-component/loading/loading.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 6,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

};

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    components,
    CategoriesMenuComponent,
    ShippingComponent,
    OrderHistoryComponent,
    FooterComponent,
    CartOperationComponent,
    LoadingComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CustomFormsModule,
    LoadingBarRouterModule,
    FontAwesomeModule,
    SwiperModule




  ],
  providers: [CategoryService, {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
