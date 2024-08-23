import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Configura el middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bingo_parley_db'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para guardar los datos
app.post('/api/guardar-datos', (req, res) => {
    const { total_jugar, total_casa, total_apagon } = req.body;
    const query = 'INSERT INTO resultados_bingo (total_jugar, total_casa, total_apagon) VALUES (?, ?, ?)';
    db.query(query, [total_jugar, total_casa, total_apagon], (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err.message);
            res.status(500).json({ error: 'Error al guardar los datos' });
            return;
        }
        res.status(200).json({ message: 'Datos guardados exitosamente' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
