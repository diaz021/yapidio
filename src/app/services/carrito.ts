import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
  ingredientes: string[];
  adicionales: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private items: ItemCarrito[] = [];
  private contadorSubject = new BehaviorSubject<number>(0);
  contador$ = this.contadorSubject.asObservable(); // 👈 observable para el contador

  agregarItem(item: ItemCarrito) {
    const existente = this.items.find(i => i.id === item.id);
    if (existente) {
      existente.cantidad += item.cantidad;
    } else {
      this.items.push({ ...item });
    }
    this.actualizarContador();
  }

  obtenerItems(): ItemCarrito[] {
    return this.items;
  }

  eliminarItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.actualizarContador();
  }

  limpiarCarrito() {
    this.items = [];
    this.actualizarContador();
  }

  obtenerTotal(): number {
    return this.items.reduce((total, i) => total + (i.precio * i.cantidad), 0);
  }

  private actualizarContador() {
    const total = this.items.reduce((sum, i) => sum + i.cantidad, 0);
    this.contadorSubject.next(total);
  }
}