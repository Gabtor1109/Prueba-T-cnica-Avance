# PruebaTecnica

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) v21.1.2.

## Descripción
Aplicación Angular para la prueba técnica FrontEnd. Incluye:
- Header y footer responsivos
- Login con Reactive Forms y validaciones
- Home con banners (Swiper), cards con modal e información seleccionada
- Listado con ngFor, consumo de API y paginación
- Sección de skills con animaciones (Renderer2)
- Preparado para Android/iOS con Capacitor

## Tecnologías principales
- Angular 21
- Angular Material
- Swiper (carousel)
- Capacitor (Android/iOS)

## Development server

Para levantar el servidor local:

```bash
ng serve
```

Luego abre `http://localhost:4200/`.

## Code scaffolding

```bash
ng generate component component-name
```

## Building

```bash
ng build
```

## Running unit tests

```bash
ng test
```

## Running end-to-end tests

```bash
ng e2e
```

## Ejecutar en Android (Capacitor)

```bash
ng build
npx cap sync android
npx cap open android
```

## Ejecutar en iOS (Capacitor)

```bash
ng build
npx cap sync ios
npx cap open ios
```

> Nota: en macOS necesitas Xcode instalado para iOS.

## Additional Resources

Para más información sobre Angular CLI, consulta la documentación oficial.
