const { response } = require("express");
const bcrypt  = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generateJWT } = require("../helpers/jwt");


const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email })
        
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un  usuario con este correo'
            })
        }

        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generateJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el admin",
        });
    }
};

const loginUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        
        let usuario = await Usuario.findOne({ email })
        
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con este email'
            })
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }
    
        //Genererar JWT
        const token = await generateJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el admin",
        });
    }
};

const renewToken = async(req, res = response) => {

    const { uid, name} = req;
  

    //Genera nuevo JWT
    const token = await generateJWT(uid, name);

    res.status(201).json({
        ok: true,
        uid,
        name,
        token
    });
};

module.exports = {
    createUser,
    loginUser,
    renewToken,
};
