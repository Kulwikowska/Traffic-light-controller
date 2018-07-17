const express = require('express'),
      cors = require('cors');//,


const app = express();
app.use(express.static('public'));
app.use(cors());
const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});