import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService, Producto } from 'src/app/services/productos';
import { CarritoService } from 'src/app/services/carrito';

@Component({
  selector: 'app-detalle-producto-restaurante',
  templateUrl: './detalle-producto-restaurante.component.html',
  styleUrls: ['./detalle-producto-restaurante.component.scss'],
  standalone: false,
})
export class DetalleProductoRestauranteComponent implements OnInit {

  producto: Producto | undefined;
  cantidad: number = 1;
  ingredientesSeleccionados: string[] = [];
  adicionalesSeleccionados: string[] = [];
  totalPrecio: number = 0;

  constructor(
    private router: Router,
    private productosSrv: ProductosService,
    private carritoSrv: CarritoService
  ) {}

  ngOnInit() {
    this.producto = this.productosSrv.getProductoTemporal();

    if (this.producto) {
      this.ingredientesSeleccionados = [...this.producto.ingredientes];
      this.calcularTotal();
    }
  }

  toggleIngrediente(ingrediente: string) {
    const index = this.ingredientesSeleccionados.indexOf(ingrediente);
    if (index > -1) {
      this.ingredientesSeleccionados.splice(index, 1);
    } else {
      this.ingredientesSeleccionados.push(ingrediente);
    }
  }

  toggleAdicional(adicional: string, precio: number) {
    const index = this.adicionalesSeleccionados.indexOf(adicional);
    if (index > -1) {
      this.adicionalesSeleccionados.splice(index, 1);
    } else {
      this.adicionalesSeleccionados.push(adicional);
    }
    this.calcularTotal();
  }

  calcularTotal() {
    if (!this.producto) return;
    let total = this.producto.precio * this.cantidad;
    this.adicionalesSeleccionados.forEach(nombre => {
      const adicional = this.producto!.adicionales.find(a => a.nombre === nombre);
      if (adicional) total += adicional.precio * this.cantidad;
    });
    this.totalPrecio = total;
  }

  cambiarCantidad(valor: number) {
    if (this.cantidad + valor >= 1) {
      this.cantidad += valor;
      this.calcularTotal();
    }
  }

  agregarAlCarrito() {
    if (!this.producto) return;
    this.carritoSrv.agregarItem({
      id: this.producto.id,
      nombre: this.producto.nombre,
      precio: this.producto.precio,
      imagen: this.producto.imagen,
      cantidad: this.cantidad,
      ingredientes: this.ingredientesSeleccionados,
      adicionales: this.adicionalesSeleccionados
    });
    this.router.navigate(['/pages/dashboard']);
  }

  volver() {
    history.back();
  }
}