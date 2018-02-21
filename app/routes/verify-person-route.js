const express = require('express');

const PersonModelValidationMiddleware = require('../middlewares/route-middleware/person-model-validation-middleware').PersonModelValidationMiddleware;
const VerifyPersonMiddleware = require('../middlewares/route-middleware/verify-person-middleware').VerifyPersonMiddleware;

const router = express.Router();

/**
 * @swagger
 * definition:
 *   PersonVerifyBody:
 *     properties:
 *       id:
 *         description: id of the person
 *         type: number
 *       name:
 *         description: the name of the person
 *         type: string
 *       address:
 *         description: the address of the person
 *         type: string
 */

/**
 * @swagger
 * verify_person:
 *   post:
 *     tags:
 *       - verifyPerson
 *     description: This endpoint allows  to verify is the  person's information is correct
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: ata which allows to identify a person.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PersonVerifyBody'
 *     responses:
 *       200:
 *         description: When the person's data  is correc and found
 *       403:
 *         description: When an error has occurred.
 *       401:
 *         description: Unauthorized
 */

router.post('/', [PersonModelValidationMiddleware, VerifyPersonMiddleware]);

module.exports = router;
