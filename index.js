const express = require('express');
const cors = require('cors');
const app = express();
const { general } = require('./channels/general');
const { projects } = require('./channels/projects');
const { blogs } = require('./channels/blogs')

app.use(cors());


const port = 8000;


const data = {
  username: 'Nimmo',
  channels: [ 
    {
      name: "General",
      slug: "general",
      description: "David Nimmo: A full stack (though front-end leaning) engineer, based in Newcastle, England. I've worked remotely since 2016, and I have no plans to change that any time soon!",
      id: "general",
      content : general 
    },
    {
    name: "Blogs",
    slug: "blogs",
    description: "Sometimes I write things! You can find examples of those times below.",
    id: "blogs",
    content: blogs
  }, {
    name: "Projects",
    slug: "projects",
    description: "A collection of projects that you can look at the source code for.",
    id: "projects",
    content: projects
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