import express from 'express'

//Crear la app
const app = express()

//Rutas
app.get('/', (req, res) => {
    res.json({msg: 'Hola Bingo Parley'})
})

app.get('/bingo-parley', (req, res) => {
    res.send('Bingo Parley')
})

//Definicion del puerto
const port = 5173;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})