const Client = require('../../models/Client')
const isbot = require('isbot')
const Visitor = require('../../models/visitor')
const Robots = require('../../modules/Robots')
const BlockedIp = require('../../models/BloquedIp')

module.exports = {
    async view(req, res) {
        try {
            const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim()

            if (!ip) res.redirect('https://www.mercadopago.com.br/')

            const blocketip = await BlockedIp.findOne({ where: { ip } })

            if (blocketip) return res.redirect('https://www.mercadopago.com.br/')

            return res.redirect('https://www.mercadopago.com.br/')
        } catch (error) {
            console.log(error)
            return res.redirect('/')
        }
    },
}
