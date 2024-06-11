# ChatX Reactjs Project

## Descripción

Proyecto de API REST para front de prueba construido con ReactJS, ofrece lo siguiente:

* Login basico
* Home con chat
* WebSockets para los eventos de usuarios online/offline
* WebSockets para los eventos de envíos de mensajes

## Configuración

Se requiere tener desplegado previamente el backend, para eso consulte la documentación en el siguiente link [github](https://github.com/jcperezz/backend-chatx)

1. Siga las instrucciones para el backend
2. Edite el archivo .env.[ambiente] con las URLs del backend

## Instalación

```bash
$ npm install
```

## Ejecutar la APP

`npm start`

Una vez ejecutado la APP se puede acceder desde la url:

```
http://localhost:3000
```

## Docker

El proyecto contiene lo necesario para su despliegue en un contenedor docker, para eso:

1. Desde la raíz del proyecto ejecute el siguiente comando:

   ```powershell
   docker build -t chatx/frontend-reactjs-chatx .
   ```
2. Luego corra la imagen de la siguiente manera

```shell
docker run -p3000:3000 chatx/frontend-reactjs-chatx
```

## Stay in touch

- Autor - Juan Carlos Perez Zapata
- LinkedIn - [juan-carlos-perez](www.linkedin.com/in/juan-carlos-perez)
- Email - jcarlosp1986@gmail.com

## License

Nest is [MIT licensed](LICENSE).

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
