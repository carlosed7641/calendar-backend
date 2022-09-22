const { Router } = require("express");
const { check } = require("express-validator");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validateFields } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/jwt-validator");

/* 
    Event Routes
    /api/events
*/


const router = Router();

//Todas tienen que pasar por las validaciones de JWT
router.use(validateJWT);

//  Obtener eventos
router.get('/', getEvents);

//Crear un nuevo envento
router.post('/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de inicio es obligatoria').custom(isDate),
        validateFields

    ],
    createEvent);  

//Actualizar Evento
router.put('/:id', updateEvent);

//Eliminar evento
router.delete('/:id', deleteEvent);


module.exports = router;