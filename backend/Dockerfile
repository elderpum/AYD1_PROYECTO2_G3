# Version node
FROM node:18

# Creando el espacio de trabajo
WORKDIR /app/backend

# Copiando archivos con dependencias y librerias necesarias para el servicio
COPY package.json ./
COPY package-lock.json ./

# Ejecutando para crear dependencias
RUN npm install

# Copiando todo el codigo
COPY . .

EXPOSE 3001

# Levantando la aplicacion
CMD ["node", "index.js"]