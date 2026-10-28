import { Component, OnInit } from '@angular/core';
import { PagoService, Pedido } from 'src/app/services/pago';
import { Router } from '@angular/router';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  standalone: false,
})
export class HistorialComponent implements OnInit {

  pedidos: Pedido[] = [];
  pedidoSeleccionado: Pedido | null = null;

  constructor(private pagoSrv: PagoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pedidos = this.pagoSrv.obtenerUltimosPedidos(20);
  }

  verDetalle(pedido: Pedido) {
    this.pedidoSeleccionado = {
      ...pedido,
      items: pedido.items || []
    };
  }

  volver() {
    this.router.navigate(['/pages/dashboard']);
  }

  cerrarDetalle() {
    this.pedidoSeleccionado = null;
  }
}

