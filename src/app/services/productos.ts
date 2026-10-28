import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  ingredientes: string[];
  adicionales: { nombre: string; precio: number }[];
}

export interface Restaurante {
  id: number;
  nombre: string;
  imagen: string;
  productos: Producto[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  restaurantes: Restaurante[] = [

    // 🍗 KFC
    {
      id: 1,
      nombre: 'KFC',
      imagen: 'assets/img/KFC.png',
      productos: [
        {
          id: 101,
          nombre: 'Pollo Broaster',
          imagen: 'assets/img/KFC.png',
          precio: 20000,
          ingredientes: ['Pollo', 'Especias'],
          adicionales: [{ nombre: 'Papas', precio: 3000 }]
        },
        {
          id: 102,
          nombre: 'Combo KFC',
          imagen: 'assets/img/KFC.png',
          precio: 25000,
          ingredientes: ['Pollo', 'Papas', 'Gaseosa'],
          adicionales: []
        }
      ]
    },

    // 🍗 FRISBY
    {
      id: 2,
      nombre: 'Frisby',
      imagen: 'assets/img/frisby.png',
      productos: [
        {
          id: 201,
          nombre: 'Pechuga Frisby',
          imagen: 'assets/img/frisby.png',
          precio: 18000,
          ingredientes: ['Pollo', 'Apanado'],
          adicionales: [{ nombre: 'Arroz', precio: 2500 }]
        },
        {
          id: 202,
          nombre: 'Combo Frisby',
          imagen: 'assets/img/frisby.png',
          precio: 24000,
          ingredientes: ['Pollo', 'Papas', 'Bebida'],
          adicionales: []
        }
      ]
    },

    // 🍔 MCDONALDS
    {
      id: 3,
      nombre: 'McDonalds',
      imagen: 'assets/img/mcdonalds.png',
      productos: [
        {
          id: 301,
          nombre: 'Big Mac',
          imagen: 'assets/img/mcdonalds.png',
          precio: 18000,
          ingredientes: ['Carne', 'Pan', 'Queso'],
          adicionales: [{ nombre: 'Tocineta', precio: 3000 }]
        },
        {
          id: 302,
          nombre: 'McCombo',
          imagen: 'assets/img/mcdonalds.png',
          precio: 26000,
          ingredientes: ['Hamburguesa', 'Papas', 'Gaseosa'],
          adicionales: []
        }
      ]
    },

    // 🥪 SUBWAY
    {
      id: 4,
      nombre: 'Subway',
      imagen: 'assets/img/subway.png',
      productos: [
        {
          id: 401,
          nombre: 'Sub Pollo',
          imagen: 'assets/img/subway.png',
          precio: 18000,
          ingredientes: ['Pan', 'Pollo', 'Lechuga', 'Tomate'],
          adicionales: [{ nombre: 'Queso extra', precio: 2000 }]
        },
        {
          id: 402,
          nombre: 'Sub Jamón',
          imagen: 'assets/img/subway.png',
          precio: 16000,
          ingredientes: ['Pan', 'Jamón', 'Queso'],
          adicionales: [{ nombre: 'Tocineta', precio: 3000 }]
        },
        {
          id: 403,
          nombre: 'Sub Italiano',
          imagen: 'assets/img/subway.png',
          precio: 20000,
          ingredientes: ['Salami', 'Pepperoni', 'Queso'],
          adicionales: []
        }
      ]
    },

    // 🍜 SR WOK
    {
      id: 5,
      nombre: 'Sr Wok',
      imagen: 'assets/img/wok.png',
      productos: [
        {
          id: 501,
          nombre: 'Arroz Oriental',
          imagen: 'assets/img/wok.png',
          precio: 18000,
          ingredientes: ['Arroz', 'Pollo', 'Vegetales'],
          adicionales: [{ nombre: 'Lumpias', precio: 4000 }]
        },
        {
          id: 502,
          nombre: 'Pollo Agridulce',
          imagen: 'assets/img/wok.png',
          precio: 20000,
          ingredientes: ['Pollo', 'Salsa agridulce'],
          adicionales: []
        },
        {
          id: 503,
          nombre: 'Combo Wok',
          imagen: 'assets/img/wok.png',
          precio: 25000,
          ingredientes: ['Arroz', 'Pollo', 'Cerdo'],
          adicionales: [{ nombre: 'Bebida', precio: 3000 }]
        }
      ]
    }

  ];

  // 🔍 OBTENER RESTAURANTES
  getRestaurantes(): Restaurante[] {
    return this.restaurantes;
  }

  // 🔍 BUSCAR PRODUCTO POR ID (AHORA CORRECTO)
  getProductoPorId(id: number): Producto | undefined {
    for (let restaurante of this.restaurantes) {
      const producto = restaurante.productos.find(p => p.id === id);
      if (producto) return producto;
    }
    return undefined;
  }

  // 📦 PRODUCTO TEMPORAL (PARA NAVEGACIÓN)
  private productoTemporal: Producto | undefined;

  setProductoTemporal(producto: Producto) {
    this.productoTemporal = producto;
  }

  getProductoTemporal(): Producto | undefined {
    return this.productoTemporal;
  }
}