import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemCarrito } from './carrito';

export interface DatosPago {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  metodoPago: 'tarjeta' | 'efectivo';
  numeroTarjeta?: string;
  cvv?: string;
  fechaVencimiento?: string;
}

export interface Pedido {
  id: string;
  fechaPedido: Date;
  items: ItemCarrito[];
  subtotal: number;
  domicilio: number;
  total: number;
  datosPago: DatosPago;
  estado: 'pendiente' | 'confirmado' | 'en_camino' | 'entregado';
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private pedidosSubject = new BehaviorSubject<Pedido[]>([]);
  pedidos$ = this.pedidosSubject.asObservable();

  private cargandoSubject = new BehaviorSubject<boolean>(false);
  cargando$ = this.cargandoSubject.asObservable();

  constructor() {
    this.cargarPedidosGuardados();
  }

  procesarPago(
    items: ItemCarrito[],
    datosPago: DatosPago,
    subtotal: number,
    domicilio: number = 3000
  ): Observable<Pedido> {
    return new Observable(observer => {
      this.cargandoSubject.next(true);

      setTimeout(() => {
        try {
          this.validarDatosPago(datosPago);

          if (datosPago.metodoPago === 'tarjeta' && Math.random() > 0.9) {
            throw new Error('Tarjeta rechazada.');
          }

          const pedido: Pedido = {
            id: this.generarIdPedido(),
            fechaPedido: new Date(),
            items: [...items], // 👈 IMPORTANTE
            subtotal: subtotal,
            domicilio: domicilio,
            total: subtotal + domicilio,
            datosPago: datosPago,
            estado: 'confirmado'
          };

          this.guardarPedido(pedido);

          this.cargandoSubject.next(false);
          observer.next(pedido);
          observer.complete();

        } catch (error: any) {
          this.cargandoSubject.next(false);
          observer.error(error.message);
        }
      }, 2000);
    });
  }

  private validarDatosPago(datos: DatosPago): void {
    if (!datos.nombre || datos.nombre.trim().length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres.');
    }
    if (!datos.email || !this.esEmailValido(datos.email)) {
      throw new Error('Email inválido.');
    }
    if (!datos.telefono || datos.telefono.trim().length < 10) {
      throw new Error('Teléfono inválido.');
    }
    if (!datos.direccion || datos.direccion.trim().length < 5) {
      throw new Error('Dirección inválida.');
    }
    if (datos.metodoPago === 'tarjeta') {
      if (!datos.numeroTarjeta || datos.numeroTarjeta.length !== 16) {
        throw new Error('Número de tarjeta inválido.');
      }
      if (!datos.cvv || datos.cvv.length !== 3) {
        throw new Error('CVV inválido.');
      }
      if (!datos.fechaVencimiento) {
        throw new Error('Fecha requerida.');
      }
    }
  }

  private esEmailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private generarIdPedido(): string {
    return 'PED-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  private guardarPedido(pedido: Pedido): void {
    const pedidos = this.obtenerTodosPedidos();
    pedidos.push(pedido);
    localStorage.setItem('yapidio_pedidos', JSON.stringify(pedidos));
    this.pedidosSubject.next(pedidos);
  }

  // 🔥 AQUÍ ESTABA EL PROBLEMA
  obtenerTodosPedidos(): Pedido[] {
    const datos = localStorage.getItem('yapidio_pedidos');

    if (!datos) return [];

    const pedidos = JSON.parse(datos);

    return pedidos.map((p: any) => ({
      ...p,
      fechaPedido: new Date(p.fechaPedido), // 👈 FIX
      items: p.items || [] // 👈 FIX
    }));
  }

  private cargarPedidosGuardados(): void {
    const pedidos = this.obtenerTodosPedidos();
    this.pedidosSubject.next(pedidos);
  }

  obtenerPedidoPorId(id: string): Pedido | undefined {
    return this.obtenerTodosPedidos().find(p => p.id === id);
  }

  obtenerUltimosPedidos(cantidad: number = 10): Pedido[] {
    return this.obtenerTodosPedidos().slice(-cantidad).reverse();
  }

  actualizarEstadoPedido(idPedido: string, nuevoEstado: Pedido['estado']): void {
    const pedidos = this.obtenerTodosPedidos();
    const pedido = pedidos.find(p => p.id === idPedido);
    if (pedido) {
      pedido.estado = nuevoEstado;
      localStorage.setItem('yapidio_pedidos', JSON.stringify(pedidos));
      this.pedidosSubject.next(pedidos);
    }
  }

  limpiarPedidos(): void {
    localStorage.removeItem('yapidio_pedidos');
    this.pedidosSubject.next([]);
  }
}