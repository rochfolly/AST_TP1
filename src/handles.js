const http = require('http');
const url = require('url');
const qs = require('querystring');


module.exports = {
  serverHandle: function(req, res) {
    const route = url.parse(req.url);
    const page = route.pathname;
    const params = qs.parse(route.query);

    console.log(page);
    console.log(params);
    res.writeHead(200, {"Content-Type": "text/plain"})
    if(page == '/'){
      ;
      res.write('la page hello peut prendre un parametre n\'mporte quel nom et affiche Bonjour mais si elle prend mon nom en parametres alors elle affiche une courte presentation de moi meme et si aucun nom n\'est entre en parametre alors elle affiche une erreur');
    }
    else if(page === '/hello' && 'name' in params){
      if(params['name'] === 'roch'){
      res.write("Bonjour, je m\'appelle Roch Folly, j\'ai 21 ans et je suis eleve de 5eme annee à l\'ECE Paris")
      }
      else{res.write('Hello ' + params['name'])}
    }
    else {
      res.writeHead(404);
      res.write('Not found');
    }
    res.end()
    }
}
