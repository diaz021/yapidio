import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ProductosService, Restaurante, Producto } from 'src/app/services/productos';
import { CarritoService } from 'src/app/services/carrito';
import { AuthService } from 'src/app/services/auth';

interface ResultadoBusqueda {
  tipo: 'restaurante' | 'producto';
  restaurante: Restaurante;
  producto?: Producto;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent implements OnInit {

  restaurantes: Restaurante[] = [];
  cantidadCarrito: number = 0;
  nombreUsuario: string = '';

  terminoBusqueda: string = '';
  resultadosBusqueda: ResultadoBusqueda[] = [];

  constructor(
    private router: Router,
    private menu: MenuController,
    private productosSrv: ProductosService,
    private carritoSrv: CarritoService,
    private authSrv: AuthService
  ) {}

  ngOnInit() {
    this.restaurantes = this.productosSrv.getRestaurantes();

    this.carritoSrv.contador$.subscribe((cantidad: number) => {
      this.cantidadCarrito = cantidad;
    });

    const usuario = this.authSrv.getUsuarioActual();
    this.nombreUsuario = usuario?.displayName || usuario?.email || 'Usuario';
  }

  buscar() {
    const termino = this.terminoBusqueda.toLowerCase().trim();

    if (!termino) {
      this.resultadosBusqueda = [];
      return;
    }

    const resultados: ResultadoBusqueda[] = [];

    this.restaurantes.forEach((restaurante) => {
      if (restaurante.nombre.toLowerCase().includes(termino)) {
        resultados.push({
          tipo: 'restaurante',
          restaurante
        });
      }

      restaurante.productos.forEach((producto) => {
        if (producto.nombre.toLowerCase().includes(termino)) {
          resultados.push({
            tipo: 'producto',
            restaurante,
            producto
          });
        }
      });
    });

    this.resultadosBusqueda = resultados;
  }

  limpiarBusqueda() {
    this.terminoBusqueda = '';
    this.resultadosBusqueda = [];
  }

  abrirResultado(item: ResultadoBusqueda) {
    if (item.tipo === 'restaurante') {
      this.irARestaurante(item.restaurante.id);
      return;
    }

    if (item.tipo === 'producto' && item.producto) {
      this.productosSrv.setProductoTemporal(item.producto);
      this.router.navigate(['/pages/detalle-producto-restaurante']);
    }
  }

  irARestaurante(id: number) {
    this.router.navigate(['/pages/detalle-restaurante', id]);
  }

  irA(ruta: string) {
    this.menu.close();
    this.router.navigate([ruta]);
  }

  irAHistorial() {
    this.router.navigate(['/pages/historial']);
  }

  cerrarSesion() {
    this.menu.close();
    this.authSrv.cerrarSesion();
  }
}