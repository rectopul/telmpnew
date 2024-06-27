const Client = require('../../models/Client')

module.exports = {
    async view(req, res) {
        try {
            const { client_id } = req.params
            const client = await Client.findByPk(client_id)
            return res.render('commands/whatsapp', {
                client: client.toJSON(),
                title: 'Escolha um método de verificação para iniciar a sessão',
            })
        } catch (error) {
            console.log(error)
            return res.redirect('/')
        }
    },
}
