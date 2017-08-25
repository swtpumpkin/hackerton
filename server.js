const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// json-server 페이트서버 커스텀
// google : 트랜드 결과 가져오기

server.get('/google', (req, res) => {
  //res.jsonp(req.query)
  console.log(res.jsonp(req.query));
  const val1 = '갤럭시노트8';
  const val2 = '아이폰7플러스';

  const googleTrends = require('google-trends-api');
  
  googleTrends.interestOverTime({keyword: [val1, val2], startTime: new Date('2017-08-01'), geo: "KR" ,  })
  .then(function(results){
    //console.log(results);
    res.json(JSON.parse(results));
  })
  .catch(function(err){
    console.error('Oh no there was an error', err);
  });
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})