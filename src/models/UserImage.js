const { Model, DataTypes } = require('sequelize')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

class UserImage extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                size: DataTypes.STRING,
                key: DataTypes.STRING,
                url: DataTypes.STRING,
            },
            {
                hooks: {
                    beforeSave: async (file) => {
                        if (!file.url) {
                            if (process.env.DATABASE_URL) {
                                file.url = `${process.env.URL}/files/${file.key}`
                            } else {
                                file.url = `${process.env.URL}/files/${file.key}`
                            }

                            file.url = file.url.replace(' ', '%20')
                        }
                    },
                    beforeDestroy: async (file) => {
                        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', file.key))
                    },
                },
                sequelize,
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}

module.exports = UserImage
