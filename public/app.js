var temp;
const req = new XMLHttpRequest();
let search = "신라면,진라면,너구리라면";

req.open('GET', '/google?sc='+search, true);
req.setRequestHeader('Content-type', 'application/json');
req.send();
req.onreadystatechange = function() {
  if(req.readyState === XMLHttpRequest.DONE){
    if(req.status == 200){
      console.log(req.responseText);
      temp = JSON.parse(req.responseText);
    }
  }
}