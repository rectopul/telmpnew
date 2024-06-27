const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const sharp = require('sharp')

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)

                file.key = `${hash.toString('hex')}-${file.originalname}`

                cb(null, file.key)
            })
        },
    }),
}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes.local,
    limits: {
        fileSize: 15 * 1024 * 1024,
    },
    fileFilter: async (req, file, cb) => {
        const allowedMines = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']

        if (allowedMines.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb({
                name: `multerError`,
                message: `Invalid file Type`,
            })
        }
    },
}

/* var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'some-bucket',
        shouldTransform: function (req, file, cb) {
            cb(null, /^image/i.test(file.mimetype))
        },
        transforms: [
            {
                id: 'original',
                key: function (req, file, cb) {
                    cb(null, 'image-original.jpg')
                },
                transform: function (req, file, cb) {
                    cb(null, sharp().jpg())
                },
            },
            {
                id: 'thumbnail',
                key: function (req, file, cb) {
                    cb(null, 'image-thumbnail.jpg')
                },
                transform: function (req, file, cb) {
                    cb(null, sharp().resize(100, 100).jpg())
                },
            },
        ],
    }),
}) */
