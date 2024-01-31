let express = require('express');
let app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let a = "Eginerring";
  res.render('index', {CompanyName: a});
});

app.listen(4000, () => console.log('Example app listening on port 4000!'));