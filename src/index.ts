import dotenv from 'dotenv'
import mongoose from 'mongoose'
import http from 'http'

import app from './app'

const server = http.createServer(app)

const port = 5000

;(async function () {
    try {
        // Connect to DB
        // await mongoose.connect(process.env.MONGO_URI!, {
        //     useNewUrlParser: true,
        //     useCreateIndex: true,
        //     useUnifiedTopology: true,
        // })
        // console.log('[Node Process] Ticket mongodb is connected...')
    } catch (e) {
        console.error(e)
    }
    // Run the server
    server.listen(port, () => {
        console.log('[Node Process] Ticket service is up on ' + port)
    })
})()

// you need this code so node will watch for exit signals
// node by default doesn't handle SIGINT/SIGTERM
// docker containers use SIGINT and SIGTERM to properly exit
//
// signals also aren't handeled by npm:
// https://github.com/npm/npm/issues/4603
// https://github.com/npm/npm/pull/10868
// https://github.com/RisingStack/kubernetes-graceful-shutdown-example/blob/master/src/index.js
// if you want to use npm then start with `docker run --init` to help, but I still don't think it's
// a graceful shutdown of node process, just a forced exit
//

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
    console.info(
        '[Node Process] Got SIGINT (aka ctrl-c in docker). Graceful shutdown ',
        new Date().toISOString(),
    )
    shutdown()
})

// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
    console.info(
        '[Node Process] Got SIGTERM (docker container stop). Graceful shutdown ',
        new Date().toISOString(),
    )
    shutdown()
})

// shut down server
function shutdown() {
    // I guess it is deprecated, because even if it's commented, I notice a graceful shutdown
    console.log(`[Node Process] Shutting down the server on port ${port} .. pid: ${process.pid}`)
    // NOTE: server.close is for express based apps
    // If using hapi, use `server.stop`
    server.close(function onServerClosed(err) {
        if (err) {
            console.error(err)
            process.exitCode = 1
        }
        process.exit()
    })
}
