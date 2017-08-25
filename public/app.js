const percent = 100;
let average = [];
let search = document.getElementById('input');
let msg = document.getElementById('message');
let btn = document.getElementById('inputBtn');
let recommendMsg = document.getElementById('resultMsg');

let searchTitle; // 검색 문자열
let searchCnt = 0; // 검색 개수
let searchData; // 검색 백분율 배열 데이터
let searchBase; // 검색 기초데이터
// 입력값을 엔터로 실행
search.addEventListener("keypress", function(event) {
  //event.preventDefault();
  if (event.keyCode == 13) {
      document.getElementById("inputBtn").click();
  }
});
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
    document.getElementById("loadingImg").style.display = "inline";
    document.getElementById("contents").style.display = "none";
    
    dummyTime = setTimeout("document.getElementById('loadingImg').style.display = 'none';document.getElementById('contents').style.display = '';", 3000);
  
    // 초기 입력값의 배열의 길이를 설정하는 변수를 할당.
    searchCnt = initValue.length;
    //각 조건에 맞으면 다음 함수를 실행하는 함수를 작성.
    searchTitle = initValue;
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
        searchBase = JSON.parse(req.responseText);
        average = searchBase.default.averages;
        //서버에서 받아온 배열의 길이를 탐색한다.
        let getArrLeng = average.length;
        //배열의 길이가 0보다 크면 서버에서 값을 받아왔기때문에 백분율을 구할 함수로 보낸다.
        if(getArrLeng>0){
          searchData = divPercent(average);
          //배열의 길이가 0이면 배열의 값을 받아오지 못했으므로 랜덤값을 입력하는 함수로 보낸다.
        }else if(getArrLeng === 0){
          searchData = randomAdd(average);
        }
        //선택 데이터 실행하는 함수.
        var result = resultMsg();
        recommendMsg.innerHTML = '우리가 추천하는 것은 \'<span style="font-weight: bold;"> '+result+ ' </span>\' 에요~';

        msg.innerHTML = "";
        // 그래프 출력
        //horizChart(searchTitle, searchData);
        giphy();
        doughnutChart(searchTitle, searchData);
        lineChart(searchBase);

        // 완료시 검색어 DB기록
        addSearch = {};
        addSearch.searchVal = val;
        req.open('POST', '/search', true);
        req.setRequestHeader('Content-type', 'application/json');
        req.send(JSON.stringify(addSearch));
      }
    }
  }
}
//빈 배열에 랜덤 숫자 담기.
const randomAdd =  (average) => {
  //입력된 배열의 길이만큼 랜덤 숫자를 담는다.
  for(let num = 0; num < searchCnt; num++){
    average.push((Math.random() * (90+1)) + 10)
  }
  return divPercent(average);
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
  //console.log(elemPercent);
  return elemPercent;
}
// 결과 메세지 출력
let resultMsg = () => {
  let maxValue = 0;
  for(let num = 0; num < searchCnt; num ++){
    if(searchData[num]>maxValue){
      maxValue = searchData[num];
    }
  }
  console.log(searchData);
  return searchTitle[searchData.indexOf(maxValue)];
  // '~~' 가 선택되었습니다.
}

// gif img 담기
const giphy = () =>{
  console.log('giphy');
  let gifFile = document.getElementById('gifImg')
  let ranNum = Math.floor((Math.random() * 5) + 1);
  gifFile.src = "/gif/"+ranNum+".gif"
  gifFile.style.display = "inline";
}