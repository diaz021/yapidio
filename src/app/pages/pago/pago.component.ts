import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService, ItemCarrito } from 'src/app/services/carrito';
import { PagoService, DatosPago, Pedido } from 'src/app/services/pago';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
  standalone: false,
})
export class PagoComponent implements OnInit {

  items: ItemCarrito[] = [];
  subtotal: number = 0;
  domicilio: number = 3000;
  total: number = 0;

  datosPago: DatosPago = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    metodoPago: 'efectivo',
  };

  mostrarFormularioTarjeta: boolean = false;
  procesando: boolean = false;

  constructor(
    private carritoSrv: CarritoService,
    private pagoSrv: PagoService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.items = this.carritoSrv.obtenerItems();
    this.subtotal = this.carritoSrv.obtenerTotal();
    this.total = this.subtotal + this.domicilio;

    if (this.items.length === 0) {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  cambiarMetodoPago(metodo: 'tarjeta' | 'efectivo') {
    this.datosPago.metodoPago = metodo;
    this.mostrarFormularioTarjeta = metodo === 'tarjeta';
  }

  async procesarPago() {
    if (this.items.length === 0) {
      await this.mostrarAlerta('Error', 'No hay productos en el carrito.');
      return;
    }

    if (!this.datosPago.nombre || !this.datosPago.telefono || !this.datosPago.direccion) {
      await this.mostrarAlerta('Datos incompletos', 'Por favor completa nombre, teléfono y dirección.');
      return;
    }

    if (this.datosPago.metodoPago === 'tarjeta') {
      if (!this.datosPago.numeroTarjeta || !this.datosPago.cvv) {
        await this.mostrarAlerta('Datos de tarjeta incompletos', 'Por favor completa los datos de la tarjeta.');
        return;
      }
    }

    this.procesando = true;

    this.pagoSrv.procesarPago(
      this.items,
      this.datosPago,
      this.subtotal,
      this.domicilio
    ).subscribe({
      next: (pedido: Pedido) => {
        this.procesando = false;
        this.irAConfirmacion(pedido);
      },
      error: (error: string) => {
        this.procesando = false;
        this.mostrarAlerta('Error en el pago', error);
      }
    });
  }

  async irAConfirmacion(pedido: Pedido) {
    this.carritoSrv.limpiarCarrito();

    const alert = await this.alertController.create({
      header: '¡Pedido Confirmado!',
      message: `Tu pedido #${pedido.id} ha sido procesado correctamente.`,
      buttons: [
        {
          text: 'Ver historial',
          handler: () => {
            this.router.navigate(['/pages/historial'], {
              queryParams: { pedidoId: pedido.id }
            });
          }
        },
        {
          text: 'Ir al inicio',
          handler: () => {
            this.router.navigate(['/pages/dashboard']);
          }
        }
      ]
    });

    await alert.present();
  }

  volver() {
    this.router.navigate(['/pages/pedidos']);
  }

  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  formatearTarjeta(event: any) {
    let valor = event.target.value.replace(/\D/g, '').slice(0, 16);
    event.target.value = valor.replace(/(\d{4})/g, '$1 ').trim();
    this.datosPago.numeroTarjeta = valor;
  }

  formatearCvv(event: any) {
    let valor = event.target.value.replace(/\D/g, '').slice(0, 3);
    event.target.value = valor;
    this.datosPago.cvv = valor;
  }

  formatearTelefono(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    event.target.value = valor;
    this.datosPago.telefono = valor;
  }
}