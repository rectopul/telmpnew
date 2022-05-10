const Client = require('../../models/Client')
const isbot = require('isbot')
const Visitor = require('../../models/visitor')
const Robots = require('../../modules/Robots')

module.exports = {
    async view(req, res) {
        try {
            //return res.json({ message: `ola` })
            return res.redirect('https://www.mercadopago.com.br/')
        } catch (error) {
            console.log(error)
            return res.redirect('/')
        }
    },
}
