import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PageRoutingModule } from './page-routing-module';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { HistorialComponent } from './historial/historial.component';
import { DetalleRestauranteComponent } from './detalle-restaurante/detalle-restaurante.component';
import { DetalleProductoRestauranteComponent } from './detalle-producto-restaurante/detalle-producto-restaurante.component';
import { PagoComponent } from './pago/pago.component'; // ← NUEVO

@NgModule({
  declarations: [
    DashboardComponent,
    PedidosComponent,
    FavoritosComponent,
    HistorialComponent,
    DetalleRestauranteComponent,
    DetalleProductoRestauranteComponent,
    PagoComponent, // ← NUEVO
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PageRoutingModule,
  ]
})
export class PageModule { }