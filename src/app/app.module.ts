import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { KitchenDisplayComponent } from './kitchen-display/kitchen-display.component';
import { UrlServices} from './urlservice';
import { ProductComponentComponent } from './product-component/product-component.component'
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';
import { OrderManageComponent } from './order-manage/order-manage.component';
import { PredictionManageComponent } from './prediction-manage/prediction-manage.component';
//import { ConstantService} from './constantservice';
@NgModule({
  declarations: [
    AppComponent,
    KitchenDisplayComponent,
    ProductComponentComponent,
    OrderManageComponent,
    PredictionManageComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
   // ConstantService,
   FormsModule,
    routing
  ],
  providers: [
     UrlServices,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

