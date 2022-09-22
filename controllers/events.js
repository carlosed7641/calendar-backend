const { response } = require("express");
const Evento = require("../models/Evento");

const getEvents = async(req, res = response) => {

 const eventos = await Evento.find()
                                .populate('user', 'name') ; //Para traer info del user

  res.json({
    ok: true,
    eventos
  });
};

const createEvent = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;

    const saveEvent = await evento.save();

    res.json({
      ok: true,
      event: saveEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
};

const updateEvent = async(req, res = response) => {

 const eventoId = req.params.id;
 const uid = req.uid;

 try {
    const event = await Evento.findById(eventoId);

    if (!event) {
        res.status(404).json({
            ok: false,
            msg: 'No existe con ese id'
        })
    }

    if (event.user.toString() !== uid) {
        return res.status(401).json({
            ok: false,
            msg: 'No tiene permisos para editar este evento'
        })
    }

    const nuevoEvento = {
        ...req.body,
        user: uid
    }

    const updatedEvent = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true});

    res.json({
        ok: true,
        evento: updatedEvent
    })



 } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Hable con el admin'
    })
 }
};

const deleteEvent = async(req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;
   
    try {
       const event = await Evento.findById(eventoId);
   
       if (!event) {
           return res.status(404).json({
               ok: false,
               msg: 'No existe con ese id'
           })
       }
   
       if (event.user.toString() !== uid) {
           return res.status(401).json({
               ok: false,
               msg: 'No tiene permisos para eliminar este evento'
           })
       }
   

       await Evento.findByIdAndDelete(eventoId);
   
       res.json({
           ok: true,
           msg: 'Evento eliminado'
       })
   
   
   
    } catch (error) {
       console.log(error);
       res.status(500).json({
           ok: false,
           msg: 'Hable con el admin'
       })
    }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
