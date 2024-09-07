import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Resultados = db.define('Resultados', {
    total_ventas: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    total_jugar: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    total_casa: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    total_apagon: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

export default Resultados;

