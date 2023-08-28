const express = require('express')
const useRouter = express.Router()
const cookieParser = require("cookie-parser");

useRouter.use(cookieParser());

//Create new room router
const roomRouter = require('./routes/roomRouter');
useRouter.use('/croom', roomRouter)

//compile code router
const codeRouter = require('./routes/codeRouter');
useRouter.use('/code', codeRouter)
module.exports = useRouter