let recording = false;

const ctx = document.getElementById('myChart').getContext('2d');

const data = {
  labels: [],
  datasets: [
    {
      label: 'pH',
      data: [],
      borderWidth: 2
    },
    {
      label: 'TDS',
      data: [],
      borderWidth: 2
    },
    {
      label: 'Turbidity',
      data: [],
      borderWidth: 2
    },
    {
      label: 'Temperature',
      data: [],
      borderWidth: 2
    }
  ]
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    animation: false,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
};

const myChart = new Chart(ctx, config);

document.getElementById("startBtn").addEventListener("click", () => {
  recording = !recording;
  document.getElementById("startBtn").innerText =
    recording ? "■ Stop Recording" : "● Start Recording";
});

setInterval(() => {
  if (!recording) return;

  // simulasi data
  let ph = (6 + Math.random()).toFixed(2);
  let tds = Math.floor(200 + Math.random() * 50);
  let turb = (5 + Math.random() * 2).toFixed(1);
  let temp = (27 + Math.random() * 2).toFixed(1);

  // update card
  document.getElementById("ph").innerText = ph;
  document.getElementById("tds").innerText = tds;
  document.getElementById("turbidity").innerText = turb;
  document.getElementById("temp").innerText = temp;

  // waktu
  let time = new Date().toLocaleTimeString();

  // push data ke grafik
  data.labels.push(time);
  data.datasets[0].data.push(ph);
  data.datasets[1].data.push(tds);
  data.datasets[2].data.push(turb);
  data.datasets[3].data.push(temp);

  // batasi 10 data terakhir
  if (data.labels.length > 10) {
    data.labels.shift();
    data.datasets.forEach(ds => ds.data.shift());
  }

  myChart.update();

}, 2000);