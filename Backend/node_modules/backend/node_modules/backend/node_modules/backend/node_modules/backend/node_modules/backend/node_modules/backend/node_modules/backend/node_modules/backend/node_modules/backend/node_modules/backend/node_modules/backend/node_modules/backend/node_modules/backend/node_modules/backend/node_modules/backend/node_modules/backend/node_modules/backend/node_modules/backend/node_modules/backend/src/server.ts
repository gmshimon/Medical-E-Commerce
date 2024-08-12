
import {Server} from 'http'
import app from './app'

let server:Server

async function bootstrap(){
    try {
        server = app.listen(8000,()=>{
            console.log("Listening to the port 8000")
        })
    } catch (error) {
        console.log(error)
    }
}

bootstrap()