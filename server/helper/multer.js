import fs from 'fs'
import multer from 'multer'

const uniqueSuffix = new Date().getFullYear() + "/" + new Date().getMonth();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "photo") {
            const path = `./assets/uploads/products/${uniqueSuffix}`
            fs.mkdirSync(path, { recursive: true })
            cb(null, path)
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffixDate = Date.now()
        cb(null, uniqueSuffixDate + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

export { upload, uniqueSuffix }