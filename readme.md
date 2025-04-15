# AdoptMe

---

## Tecnologías Utilizadas

- **Node.js** + **Express**
- **MongoDB** (utilizando Mongoose)
- **Docker** para contenerización
- **Mocha** + **Chai** + **Supertest** para testing
- **Swagger** para documentación de API

---

## Instalación y Uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/maximilianoAttanasio/adoptme.git
cd adoptme
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Cambiar a la rama 'version-2'

```bash
git checkout version-2
```

Nota: Esta es la rama donde se encuentran los cambios más recientes y las mejoras implementadas.

### 4. Levantar el servidor

```bash
npm start
```

### 5. Acceder a la documentación de Users (Swagger)

En el navegador ingresa a:

```bash
http://localhost:8080/api-docs/
```

Podrás ver todas las rutas disponibles para users, también podrás probarlas directamente ingresando los parámetros y haciendo click en el botón "Try it out".

### 6. Ejecutar los test

Con el servidor en funcionamiento, abre una nueva consola (sin cerrar donde el servidor se está ejecutando) y ejecuta el siguiente comando para correr los tests:

```bash
npm test
```

### 7. Descargar la imagen de docker

Puedes descargar la imagen directamente desde Docker Hub con el comando:

```bash
docker pull uselessmawi/adoptme-app
```

También puedes acceder al repositorio de Docker desde el link:

```bash
https://hub.docker.com/r/uselessmawi/adoptme-app
```

### 8. Levantar el contenedor de Docker Hub

Una vez descargada la imagen, puedes acceder al contenedor con el comando:

```bash
docker run -p 8080:8080 uselessmawi/adoptme-app
```

### 9. Detener el servidor

Para detener el servidor (contenedor):

1. Desde Docker Desktop busca la pestaña containers y haz click en el botón stop al lado del contenedor que desees detener.

2. Desde una nueva terminal ejecuta el comando para obtener su ID.

```bash
docker ps
```

Detén el contenedor utilizando su ID:

```bash
docker stop <CONTAINER_ID>
```

Modifica <CONTAINER_ID> por el ID que aparece con el comando docker ps.
