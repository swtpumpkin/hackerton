const percent = 100;
let average = [];
let search = document.getElementById('input');
let msg = document.getElementById('message');
let btn = document.getElementById('inputBtn');
// 입력값을 확인하고 조건에 맞으면 다음 함수 실행.
btn.addEventListener('click', function () {
  //(,)로 구분된 각 단어의 앞뒤 띄어쓰기 삭제 시작.
  let initValue=[];
  //map 프로퍼티로 각 요소마다 순회하고 trim프로퍼티를 이용하여 띄어쓰기 제거
  search.value.split(',').map(search => {
    search = search.trim();
    initValue.push(search);
  });
  //(,)로 구분된 각 단어의 앞뒤 띄어쓰기 완료.
  //두개의 요소로 이루어졌는지 검사.
  if(initValue.length <= 1){
    msg.innerHTML = '두가지 이상을 입력해주세요';
  } else {
    //각 조건에 맞으면 다음 함수를 실행하는 함수를 작성.
    getGoogleTd(initValue);
  }
});

const getGoogleTd = (val) => {
  const req = new XMLHttpRequest();
  req.open('GET', '/google?sc='+val, true);
  req.setRequestHeader('Content-type', 'application/json');
  req.send();
  req.onreadystatechange = function() {
    if(req.readyState === XMLHttpRequest.DONE){
      if(req.status == 200){
        //console.log(req.responseText);
        average = JSON.parse(req.responseText);
        average = average.default.averages;
        console.log(average);
        divPercent(average);
      }
    }
  }
}
//나온 결과를 백분율로 배열에 새로 할당.
const divPercent  = (average) => {
  let elemPercent = [];
  let sum = 0;
  //각 요소를 더함.
  for(let num = 0; num < average.length; num++){
    sum += average[num];
  }
  //각 요소를 더한값으로 나누기 위한 for문.
  for(let num = 0; num < average.length; num++){
    elemPercent.push(((average[num]/sum)*100).toFixed(2)*1)
  }
  //elemPercent에 배열의 형태로 백분율 된 값이 담김.
  console.log(elemPercent);
}