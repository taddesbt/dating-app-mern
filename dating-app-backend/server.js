import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js'


//App Config
const app = express()
const port = process.env.PORT || 8001

const connection_url = 'mongodb+srv://taddesbt:Winter16@cluster0.nqawr.mongodb.net/?retryWrites=true&w=majority'



//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
//API Endpoints

mongoose.connect(connection_url, {
    useNewUrlParser: true,

    // useUnifiedTopology: true
})



app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/dating/cards', (req, res) => {
    const dbCard = req.body
        Cards.create(dbCard)
        .then(() => res.json('cards added!'))
        .catch(err => res.status(400).json('Error: ' + err));


})
app.get('/dating/cards', (req, res) => {

    Cards.find()
        .then(data => res.json(data))

        .catch(err => res.status(400).json('Error: ' + err));



})



//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))