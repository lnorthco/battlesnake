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
//  const height = request.body.board.height
//  console.log(height)
//  const width = request.body.board.width
// console.log(width)

  // Response data
  const data = {
    color: '#DFFF00',
  }

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move
  //GET INFORMATION
var height = request.body.board.height -1
var width = request.body.board.width -1
var myBody = request.body.you.body
//console.log(height)
//console.log(width)
  //console.log(request.body)
var head = request.body.you.body[0]
  //SURVIVAL - Find next viable moves
var up = true
var down = true
var left = true
var right = true

  //check edges
if(head.y == '0') up=false
if(head.y == height) down=false
if(head.x == '0') left=false
if(head.y == width) right=false

//Get new possible head locations
var upNewHead = {x:head.x,y:head.y-1}
var downNewHead = {x:head.x,y:head.y+1}
var leftNewHead = {x:head.x-1,y:head.y}
var rightNewHead = {x:head.x+1,y:head.y}

//Test if new head location will hit any other snakes or its self. Snakes contains your body.	
snakes = request.body.board.snakes
//console.log(request.body.board.snakes.length)
for(j=0;j<snakes.length;j++){
	snakeBody = snakes[j].body
	for(i=0;i<snakeBody.length;i++){
		if(upNewHead.x==snakeBody[i].x && upNewHead.y==snakeBody[i].y){up=false}
		if(downNewHead.x==snakeBody[i].x && downNewHead.y==snakeBody[i].y){down=false}
		if(leftNewHead.x==snakeBody[i].x && leftNewHead.y==snakeBody[i].y){left=false}
		if(rightNewHead.x==snakeBody[i].x && rightNewHead.y==snakeBody[i].y){right=false}
	}
}

console.log('down:' + down)
var data
if(down){data = {move: 'down',}}
else if(left){ data = {move: 'left',}}
else if(up){ data = {move: 'up',}}
else if(right){ data = {move: 'right',}}
	
return response.json(data)

})

/*
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

*/

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
