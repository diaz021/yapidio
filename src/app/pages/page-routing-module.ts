import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { HistorialComponent } from './historial/historial.component';
import { DetalleRestauranteComponent } from './detalle-restaurante/detalle-restaurante.component';
import { DetalleProductoRestauranteComponent } from './detalle-producto-restaurante/detalle-producto-restaurante.component';
import { AuthGuard } from '../guards/auth-guard';
import { PagoComponent } from './pago/pago.component'; 


const routes: Routes = [
  { path: 'dashboard',                    component: DashboardComponent,                   canActivate: [AuthGuard] },
  { path: 'pedidos',                      component: PedidosComponent,                     canActivate: [AuthGuard] },
  { path: 'pago',                         component: PagoComponent,                        canActivate: [AuthGuard] },
  { path: 'favoritos',                    component: FavoritosComponent,                   canActivate: [AuthGuard] },
  { path: 'historial',                    component: HistorialComponent,                   canActivate: [AuthGuard] },
  { path: 'detalle-restaurante/:id',      component: DetalleRestauranteComponent,          canActivate: [AuthGuard] },
  { path: 'detalle-producto-restaurante', component: DetalleProductoRestauranteComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }