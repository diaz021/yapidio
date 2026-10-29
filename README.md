# YaPidio

Aplicación móvil de domicilios de comida, al estilo de Rappi, desarrollada como **proyecto del seminario de grado** (opción de grado) de Ingeniería de Sistemas en la Corporación Universitaria Remington.

> **Proyecto académico sin terminar.** Es un prototipo: los restaurantes y productos están definidos en el código, y el pago es simulado (no procesa pagos reales). Los nombres e imágenes de restaurantes se usan solo como ejemplo.

## Funcionalidades

- Registro e inicio de sesión con Firebase Authentication
- Lista de restaurantes y detalle de cada producto, con ingredientes y adicionales
- Carrito de compras
- Restaurantes y productos favoritos
- Pago simulado con tarjeta o efectivo, con costo de domicilio
- Pedidos con estado e historial

## Herramientas utilizadas

- **Ionic 8** y **Angular 20** con **TypeScript**
- **Capacitor 8** para generar la app de **Android**
- **Firebase Authentication** para el registro y el inicio de sesión
- **SCSS** para los estilos
- Almacenamiento local del dispositivo para pedidos y favoritos

## Correrlo

1. `npm install`
2. Poner la configuración de un proyecto propio de Firebase en `src/environments/environment.ts`
3. `npm start` para verla en el navegador
4. Para Android: `npm run android:prod` y abrir la carpeta `android` en Android Studio

## Autor

Juan Esteban Díaz Rojas · [github.com/diaz021](https://github.com/diaz021)
