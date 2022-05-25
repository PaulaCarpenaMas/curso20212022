'use stric'

const mongoose= require('mongoose')
const app=require('./app')
const config =require('./config')

mongoose.connect(config.db, (err,res)=>{
    if(err){
        return console.log(`Error al conectar a la base de datos: ${err}`)
    } throw err
    console.log('conexion a la base de datos establecia...')

    app.listen(config.port, ()=>{
        console.log (`api rest corriendo en un http: ${config.port}`)
    })
})

