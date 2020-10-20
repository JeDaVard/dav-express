import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { app } from './app'

const port = 3000

;(async function () {
    try {
        // Connect to DB
        await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
        console.log('Ticket mongodb is connected...')
    } catch (e) {
        console.error(e)
    }
    // Run the server
    app.listen(port, () => {
        console.log('Ticket service is up on ' + port)
    })
})()
