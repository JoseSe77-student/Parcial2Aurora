const { Router } = require('express');
const controller = require('../controllers/libros.controller');

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

module.exports = router;
