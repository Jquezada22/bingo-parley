import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import bodyParser from 'body-parser';
import Resultados from './models/ResultadosBingo.js'; // Verifica que este archivo exista

const app = express();

// Middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
try {
    await db.authenticate();
    await db.sync();
    console.log('Conexión correcta a la base de datos');
} catch (error) {
    console.error('Error al conectar con la base de datos:', error);
}

// Ruta POST para guardar resultados en la base de datos
app.post('localhost:5173/api/resultados', async (req, res) => {
    try {
        const { totalVentas, totalJugar, totalCasa, totalApagon } = req.body;

        // Crear un nuevo registro en la tabla
        await Resultados.create({
            total_ventas: totalVentas,
            total_jugar: totalJugar,
            total_casa: totalCasa,
            total_apagon: totalApagon,
            fecha: new Date() // Guardar la fecha actual
        });

        res.status(201).json({ message: 'Resultados guardados correctamente' });
    } catch (error) {
        console.error('Error al guardar los resultados:', error);
        res.status(500).json({ message: 'Error al guardar los resultados' });
    }
});

// Configurar el puerto
const port = process.env.PORT || 5173;

// Configurar la ruta de los archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

// Servir el archivo index.html de la aplicación React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});
