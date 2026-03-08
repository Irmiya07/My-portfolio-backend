
const {createCertificate, getCertificates, deleteCertificate} = require('../controllers/certificateController');

const router = require('express').Router();

const auth=require('../middleware/authMiddleware');
const upload=require('../middleware/upload')

router.post('/', auth,upload.single("image"), createCertificate);

router.get('/', getCertificates);

router.delete('/:id', auth, deleteCertificate);

module.exports = router;