const jsonServer = require(‘json-server’)
const server = jsonServer.create()
const router = jsonServer.router(‘db.json’)
const middlewares = jsonServer.defaults()

server.use(middlewares)

// json-server 페이트서버 커스텀
// google : 트랜드 결과 가져오기

<<<<<<< HEAD
server.get('/google', (req, res) => {
  //console.log(' 결과 ', req.query.sc);
  
  let search = req.query.sc.split(',');
=======
server.get(‘/google’, (req, res) => {
  //console.log(' 결과 ‘, req.query.sc);
  
 let search = req.query.sc.split(‘,’);
>>>>>>> 1ba3d2a7208c6c275f13531308ddf4717d3c76ce
  console.log(search);

 const googleTrends = require(‘google-trends-api’);
  
<<<<<<< HEAD
  googleTrends.interestOverTime({keyword: search, startTime: new Date('2017-08-01'), geo: "KR" ,  })
=======
 googleTrends.interestOverTime({keyword: search, startTime: new Date(‘2017-08-01’), geo: “KR” ,  })
>>>>>>> 1ba3d2a7208c6c275f13531308ddf4717d3c76ce
  .then(function(results){
    //console.log(results);
    res.json(JSON.parse(results));
  })
  .catch(function(err){
    console.error(‘Oh no there was an error’, err);
  });
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === ‘POST’) {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(router)
server.listen(3000, () => {
  console.log(‘JSON Server is running’)
})