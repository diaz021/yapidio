import { Component, OnInit } from '@angular/core';
import { FavoritosService } from 'src/app/services/favoritos';
import { Restaurante, Producto } from 'src/app/services/productos';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito';
import { ProductosService } from 'src/app/services/productos';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
  standalone: false,
})
export class FavoritosComponent implements OnInit {

  restaurantes: Restaurante[] = [];
  productos: Producto[] = [];

  segmento: 'restaurantes' | 'productos' = 'restaurantes';

  constructor(
    private favSrv: FavoritosService,
    private router: Router,
    private carritoSrv: CarritoService,
    private productosSrv: ProductosService,
  ) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  ionViewWillEnter() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.restaurantes = this.favSrv.getRestaurantes();
    this.productos = this.favSrv.getProductos();
  }

  cambiarSegmento(event: any) {
    this.segmento = event.detail.value;
  }
  volver() {
    this.router.navigate(['/pages/dashboard']);
  }
  irARestaurante(restaurante: any) {
    this.router.navigate(['/pages/detalle-restaurante', restaurante.id]);
  }
  agregarProducto(producto: any) {
    this.carritoSrv.agregarItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
      ingredientes: producto.ingredientes || [],
      adicionales: []
    });
  }
  irAProducto(producto: any) {
    this.productosSrv.setProductoTemporal(producto);
    this.router.navigate(['/pages/detalle-producto-restaurante']);
  }
}