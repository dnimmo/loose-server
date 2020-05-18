// Obviously this ought to be doing something more interesting, but right now it...well, doesn't. It's just here so that I could make sure that the Loose client app was actually able to request data from an API.

const express = require('express');
const cors = require('cors')
const app = express();
const uuid = require('uuid')

app.use(cors());


const port = 8000;


const data = {
  username: 'Nimmo',
  channels: [ {
    name: "General",
    slug: "general",
    id: uuid.v4(),
    content: [ "posts will go here" ]
  }, {
    name: "Random",
    slug: "random",
    id: uuid.v4(),
    content: [ "posts will go here" ]
  } ]
}

app.get('/', (req, res) => res.json({
  headers: { 
      'Access-Control-Allow-Origin' : '*'
  },
  statusCode: 200,
  body: JSON.stringify(data),
}));

app.listen(port, () => console.log(`Listening on port ${port}`));