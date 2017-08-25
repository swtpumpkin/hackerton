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

/*------------------------------------*/
/* [ Chart Draw ] */

const horizChart = (scName, scVal) => {
  
  let chart1 = new Chart(resultCh1, {
    type: 'horizontalBar',
    data: {
        //labels: ["Red", "Blue", "Yellow", "Green"],
        labels: scName,
        datasets: [{
            //data: [12, 19, 3, 5],
            data: scVal,
            borderWidth: 1,
            backgroundColor: chartBg1,
            borderColor: chartBgBrd,
        }]
    },
    options: {
        legend: {
        }
    }
  });
  console.log(chart1);
}

const doughnutChart = (scName, scVal) => {
  let chart2 = new Chart(resultCh2, {
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
        legend: {
        }
    }
  });
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