# Imagen base
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que usa Express (ajusta si es otro)
EXPOSE 8080

# Comando para iniciar la app
CMD ["npm", "start"]
