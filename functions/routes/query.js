const express = require('express');
const router = express.Router();
const { getOnly } = require('../components/googleSheet.js');

router.get('/:code', async (req, res) => {
    if (typeof (req.params.code) !== "undefined") {
        const result = await getOnly(req.params.code)
        if (result === 0) {
            return res.send({
                status: "Not Found"
            })
        } else {
            return res.send({
                token: result
            })
        }
    } else {
        return res.status(403).send("Access Deny")
    }
})

module.exports = router;