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
    description: "The general channel: Everyone is in here!",
    id: uuid.v4(),
    content: [ "posts will go here" ]
  }, {
    name: "Pet pics",
    slug: "pet-pics",
    description: "For pictures of cats and inferior animals.",
    id: uuid.v4(),
    content: [ "posts will go here" ]
  }, {
    name: "Random",
    slug: "random",
    description: "For the stuff that doesn't fit into any other channels.",
    id: uuid.v4(),
    content: [ "posts will go here" ]
  } ]
}


const channelsHashmap =
  data.channels.reduce(
    (accumulator, current) => ({
      ...accumulator,
      [current.id] : current
    }),
    {}
  )


app.get('/channelList/:username', (req, res) => 
    // Eventually the idea here is that there would be more than one username, but obviously right now there isn't
    res.json({
      headers: { 
          'Access-Control-Allow-Origin' : '*'
      },
      statusCode: 200,
      body: JSON.stringify(data.channels.map(({ slug, id }) => ({slug, id}))),
    })
  );


app.get('/channel/:id', (req, res) => 
    res.json({
      headers: { 
          'Access-Control-Allow-Origin' : '*'
      },
      statusCode: 200,
      body: JSON.stringify(channelsHashmap[req.params.id]),
    })
  );

app.listen(port, () => console.log(`Listening on port ${port}`));