const http = require('http');

const app = require('./app');

const {loatPlanetsData} = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app)

async function startServer() {
    await loatPlanetsData();
    
    server.listen(PORT, () => {
        console.log(`Server started on http://localhost/${PORT}`)
    })
} 


startServer();