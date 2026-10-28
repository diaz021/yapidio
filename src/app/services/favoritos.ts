import { Injectable } from '@angular/core';
import { Restaurante, Producto } from './productos';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private KEY_RESTAURANTES = 'fav_restaurantes';
  private KEY_PRODUCTOS = 'fav_productos';

  // =========================
  // 🔥 RESTAURANTES
  // =========================

  getRestaurantes(): Restaurante[] {
    const data = localStorage.getItem(this.KEY_RESTAURANTES);
    return data ? JSON.parse(data) : [];
  }

  toggleRestaurante(restaurante: Restaurante) {
    let favoritos = this.getRestaurantes();

    const existe = favoritos.find(r => r.id === restaurante.id);

    if (existe) {
      favoritos = favoritos.filter(r => r.id !== restaurante.id);
    } else {
      favoritos.push(restaurante);
    }

    localStorage.setItem(this.KEY_RESTAURANTES, JSON.stringify(favoritos));
  }

  esRestauranteFavorito(id: number): boolean {
    return this.getRestaurantes().some(r => r.id === id);
  }

  // =========================
  // ❤️ PRODUCTOS
  // =========================

  getProductos(): Producto[] {
    const data = localStorage.getItem(this.KEY_PRODUCTOS);
    return data ? JSON.parse(data) : [];
  }

  toggleProducto(producto: Producto) {
    let favoritos = this.getProductos();

    const existe = favoritos.find(p => p.id === producto.id);

    if (existe) {
      favoritos = favoritos.filter(p => p.id !== producto.id);
    } else {
      favoritos.push(producto);
    }

    localStorage.setItem(this.KEY_PRODUCTOS, JSON.stringify(favoritos));
  }

  esProductoFavorito(id: number): boolean {
    return this.getProductos().some(p => p.id === id);
  }
}