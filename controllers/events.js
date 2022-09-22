const { response } = require("express");


const getEvents = (req, res = response) => {
    res.json({
        ok: true, 
        msg: 'getEventos'
    })
}

const createEvent = (req, res = response) => {

    //Verificar que tenga el evento
    console.log(req.body);
    

    res.json({
        ok: true, 
        msg: 'create'
    })
}

const updateEvent = (req, res = response) => {
    res.json({
        ok: true, 
        msg: 'update'
    })
}

const deleteEvent = (req, res = response) => {
    res.json({
        ok: true, 
        msg: 'eliminar'
    })
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}