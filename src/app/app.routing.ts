
import { KitchenDisplayComponent } from './kitchen-display/kitchen-display.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { OrderManageComponent } from './order-manage/order-manage.component';
import { PredictionManageComponent } from './prediction-manage/prediction-manage.component';

export const routes: Routes = [
  { path: '', component: KitchenDisplayComponent, pathMatch: 'full' },
  { path: 'product', component: ProductComponentComponent, pathMatch: 'full' },
  //{ path: 'product', redirectTo: '/ProductComponentComponent', pathMatch: 'full' },
  { path: 'display', component: KitchenDisplayComponent },
  { path: 'order', component: OrderManageComponent },
  { path: 'managePrediction', component: PredictionManageComponent }
 
  //{ path: 'product', component: ProductComponentComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true }); 
