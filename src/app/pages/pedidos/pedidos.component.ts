import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService, ItemCarrito } from 'src/app/services/carrito';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  standalone: false,
})
export class PedidosComponent implements OnInit {

  items: ItemCarrito[] = [];
  total: number = 0;

  constructor(
    private carritoSrv: CarritoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.items = this.carritoSrv.obtenerItems();
    this.total = this.carritoSrv.obtenerTotal();
  }

  eliminarItem(id: number) {
    this.carritoSrv.eliminarItem(id);
    this.cargarCarrito();
  }

  // ✅ NO limpiar aquí
  confirmarPedido() {
    this.router.navigate(['/pages/pago']);
  }

  volver() {
    this.router.navigate(['/pages/dashboard']);
  }
}