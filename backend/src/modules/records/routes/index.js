const router = require('express').Router();

const create = require('../controllers/create');
const getAll = require('../controllers/getAll');
const update = require('../controllers/update');

/**
 * TODO: apply hapi/joy validation
 */
router.get('/', getAll);
router.post('/', create);
router.patch('/', update);


module.exports = router;
