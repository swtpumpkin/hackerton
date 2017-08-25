/*------------------------------------*/
/* [ 차트 기본 데이터 ] */
const chartBg1 = [
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 206, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(255, 159, 64, 0.5)'
];

const chartBg2 = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

const chartBgBrd = [
  'rgba(255,99,132,1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

var resultCh1 = document.getElementById("resultChart1");
var resultCh2 = document.getElementById("resultChart2");
var resultCh3 = document.getElementById("resultChart3");

/*------------------------------------*/
/* [ Chart Draw ] */

const horizChart = (scName, scVal) => {
  //scName.push('max');
  //scVal.push(100);
  let chart1;
  chart1 = new Chart(resultCh1, {
    type: 'horizontalBar',
    data: {
        //labels: ["Red", "Blue", "Yellow", "Green"],
        labels: scName,
        datasets: [{
            //data: [12, 19, 3, 5],
            data: scVal,
            borderWidth: 1,
            backgroundColor: chartBg1,
            borderColor: chartBgBrd
        }],
    },
    options: {
      animation:{
        duration: 3000,
      },
        legend: {
        }
    }
  });
  console.log(chart1);
}

const doughnutChart = (scName, scVal) => {
  let chart2;
  chart2 = new Chart(resultCh2, {
    type: 'doughnut',
    data: {
        //labels: ["Red", "Blue", "Yellow", "Green"],
        labels: scName,
        datasets: [{
            //data: [12, 19, 3, 5],
            data: scVal,
            borderWidth: 2,
            backgroundColor: chartBg2,
            borderColor: chartBgBrd,
            
        }]
    },
    options: {
      animation:{
        duration: 2900,
      },
        legend: {
        }
    }
  });
}

const lineChart = (base) => {
  console.log(base);
  const lineBase = base.default.timelineData;
  let baseLabel = [];
  let baseDataset = [];
  let baseObject = {};

  for(let j = 0; j < 8 ; j++){
    let x = j + 14;
    baseLabel.push(lineBase[x].formattedAxisTime);
  }

  for(let i = 0; i < searchCnt ; i++){
    console.log('[ searchTitle ] >>', searchTitle );
    baseObject.label = searchTitle[i];
    baseObject.backgroundColor = chartBg1[i];
    baseObject.borderColor = chartBgBrd[i];
    baseObject.fill = false;
    baseObject.data = [];
    for(let j = 0; j < 8 ; j++){
      let x = j + 14;
      baseObject.data.push(lineBase[x].value[i]);
    }

    baseDataset.push(baseObject);
    baseObject = {};
  }

  console.log('[ baseLabel ] >>', baseLabel );
  console.log('[ baseDataset ] >>', baseDataset );
  let config = {
      type: 'line',
      data: {
          labels: baseLabel,
          datasets: baseDataset
          /*[{
              label: "My First dataset",
              backgroundColor: chartBg1[0],
              borderColor: chartBgBrd[0],
              data: [
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor()
              ],
              fill: false,
          }, {
              label: "My Second dataset",
              fill: false,
              backgroundColor: chartBg1[0],
              borderColor: chartBgBrd[0],
              data: [
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor()
              ],
          }]*/
      },
      options: {
          responsive: true,
          title:{
              display:true,
              text:'Google 트랜드 현황'
          },
          tooltips: {
              mode: 'index',
              intersect: false,
          },
          hover: {
              mode: 'nearest',
              intersect: true
          },
          scales: {
              xAxes: [{
                  display: true,
                  scaleLabel: {
                      display: true,
                      labelString: 'Month'
                  }
              }],
              yAxes: [{
                  display: true,
                  scaleLabel: {
                      display: true,
                      labelString: 'Value'
                  }
              }]
          }
      }
  };
  let chart3;
  chart3 = new Chart(resultCh3, config);
}

/* 예제 */
/*
horizChart(
  ["Red", "Blue", "Yellow", "Green"],
  [12, 19, 3, 5]
);

doughnutChart(
  ["Red", "Blue", "Yellow", "Green"],
  [12, 19, 3, 5]
);
*/