const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  //res.jsonp(req.query)
  console.log(req.query.val1);
  const val1 = req.query.val1;
  const val2 = req.query.val2;

  const googleTrends = require('google-trends-api');
  
  googleTrends.interestOverTime({keyword: [val1, val2], startTime: new Date('2017-08-01'), geo: "KR" ,  })
  .then(function(results){
    res.json(JSON.parse(results));
    //console.log(results);
    //return results;
    //console.log('These results are awesome', results);
  })
  .catch(function(err){
    console.error('Oh no there was an error', err);
  });
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})