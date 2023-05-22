# Menggunakan base image Node.js
FROM node:14

# Mengatur direktori kerja di dalam container
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Menjalankan perintah npm install untuk menginstal dependensi
RUN npm install

# Menyalin semua file dari direktori aplikasi ke dalam container
COPY . .

# Menjalankan perintah untuk menjalankan aplikasi saat container dijalankan
CMD [ "npm", "start:prod" ]
