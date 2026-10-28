import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { MenuController, Platform } from '@ionic/angular'; // 👈 Platform de ionic

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  constructor(
    private router: Router,
    private menu: MenuController,
    private platform: Platform // 👈 Platform de ionic, no de capacitor
  ) {
    this.platform.ready().then(() => {
      this.configurarStatusBar();
    });
  }

  async configurarStatusBar() {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setOverlaysWebView({ overlay: false });
      await StatusBar.setBackgroundColor({ color: '#000000' });
    } catch (error) {
      console.error('Error configurando StatusBar:', error);
    } // 👈 faltaba el catch
  }

  async navegarA(ruta: string) {
    await this.menu.close();
    this.router.navigate([ruta]);
  }

  async cerrarSesion() {
    await this.menu.close();
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }
}