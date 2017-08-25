let search = document.getElementById('input');
let msg = document.getElementById('message');
let btn = document.getElementById('inputBtn');

btn.addEventListener('click', function () {
  if(search.split(',').length <= 1){
    msg.innerHTML = '두가지 이상을 입력해주세요';
  } else {
    getGoogleTd(search.split(','));
  }
});

const getGoogleTd = (val) => {
  var result;
  const req = new XMLHttpRequest();
  req.open('GET', '/google?sc='+val, true);
  req.setRequestHeader('Content-type', 'application/json');
  req.send();
  req.onreadystatechange = function() {
    if(req.readyState === XMLHttpRequest.DONE){
      if(req.status == 200){
        console.log(req.responseText);
        result = JSON.parse(req.responseText);
      }
    }
  }
}