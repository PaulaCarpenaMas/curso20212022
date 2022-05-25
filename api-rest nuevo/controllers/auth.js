'use strict'

const req = require('express/lib/request')
const mongoose= require('mongoose')
const User= require('../models/user')
const service=require('../services')
const bcrypt = require('bcrypt-nodejs')

function signUp(req,res){
    const user=new User({
        email:req.body.email,
        displayName: req.body.displayName,
        password: req.body.password,
    })
    user.save((err)=>{
        if(err) res.status(500).send({message:`Error al crear el usuario: ${err}`})

        return res.status(200).send({token: service.createToken(user)})
    })
}

async function singIn(req,res){
    await User.findOne({email:req.body.email})
        .then((user) =>{
            if(!user)
            return res
                .status(404)
                .send({message:'El usuario no esta registrado'});

        const password_verfication=bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (password_verfication){
            res.status(200).send({
                message: 'Te has logeado correctamente',
                token: service.createToken(user),
            });
        }else{
            res.status(500).send({message:'Email o contraseña incorrecta'})
        }
    })
    .catch((err) => {
        return res
            .status(500)
            .send({ message: `Error al realizar la petición ${err}` });
    });
}

async function closeAcount(req, res) {
    await User.findOneAndDelete({ email: req.user })
      .then((user) => {
        if (!user) notFound(res);
        successResponse(res, "Cuenta cerrada con éxito");
      })
      .catch((error) => faliedResponse(res, error));
  }

module.exports ={
    signUp,
    singIn
}