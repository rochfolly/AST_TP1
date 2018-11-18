const express = require('express')
const app = express()

app.set('port', 8080)

app.get('/', function(req,res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('la page hello peut prendre un parametre n\'mporte quel nom et affiche Bonjour mais si elle prend mon nom en parametres alors elle affiche une courte presentation de moi meme et si aucun nom n\'est entre en parametre alors elle affiche une erreur');
  res.end()
});

app.get('/hello/:name', function(req,res){
  if(req.params.name==='roch') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Bonjour, je m\'appelle Roch Folly, j\'ai 21 ans et je suis eleve de 5eme annee à l\'ECE Paris");
    res.end()
  }
  else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello ' + req.params.name);
    res.end()
  }
});

app.listen(
  app.get('port'),
  () => console.log(`server listening on ${app.get('port')}`)
)


/* const path = require('path')
const express = require('express')
const app = express()
app.set('port', 8080)

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use('/', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get('/name', function(req,res){
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(require('template').content);
  res.end()
})

app.get('metrics.json', (req,res) => {
  metrics.get(function(err, res){
    if(err) throw err
    res.status(200).json(data)
  })
})

app.get('/hello/:name', (req,res) => {
  //res.send("Hello" + req.params.name)
  res.render('hello.ejs', {name: req.params.name})
})

app.use('/personnes', require('./src/personnes'))


app.listen(app.get('port'), () => {
  console.log('server listening on port' + app.get('port'))
})  */
