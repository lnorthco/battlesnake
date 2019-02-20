const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const app = express()
const {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler
} = require('./handlers.js')

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---


// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game
console.log(request.body)
  const height = request.body.board.height
  console.log(height)
  const width = request.body.board.width
  console.log(width)

  // Response data
  const data = {
    color: '#DFFF00',
  }

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move
const height = request.body.board.height
const width = request.body.board.width
  //Output information
  //console.log(request.body)

	//GO LEFT
  //console.log(request.body.you.body[0])
  if(request.body.you.body[0].x!=0){
  // Response data
  	const data = {
		 move: 'left', // one of: ['up','down','left','right']
  	}
	console.log('x:')
	console.log(request.body.you.body[0].x)
	return response.json(data)
  }
  


	//GO UP
  if(request.body.you.body[0].y!=0){
  // Response data
  	const data = {
        	 move: 'up', // one of: ['up','down','left','right']
  	}
	console.log('y:')  
	console.log(request.body.you.body[0].y)
	return response.json(data)
  }

  const data = {move: 'right',}	
  return response.json(data)

})

app.post('/end', (request, response) => {
  // NOTE: Any cleanup when a game is complete.
  return response.json({})
})

app.post('/ping', (request, response) => {
  // Used for checking if this snake is still alive.
  return response.json({});
})

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})
