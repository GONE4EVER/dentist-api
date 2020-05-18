const router = require('express').Router();

const create = require('../controllers/create');
const getAll = require('../controllers/getAll');

/**
 * TODO: apply hapi/joy validation
 */
router.post('/', create);
router.get('/', getAll);


module.exports = router;
