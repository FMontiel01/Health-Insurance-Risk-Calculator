'use strict';

const API_BASE_URL = 'https://health-insurance-risk-calculator-server-ade2ccbmetgxeber.canadacentral-01.azurewebsites.net/api';


// reusable function to fill dropdowns
function fillSelect(id, start, end) {
  const select = document.getElementById(id);

  for (let i = start; i <= end; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }
}

// fill all dropdowns
fillSelect('age', 18, 100);
fillSelect('feet', 3, 8);
fillSelect('inches', 0, 11);
fillSelect('weight', 50, 500);
fillSelect('systolic', 80, 220);
fillSelect('diastolic', 40, 140);


const form = document.getElementById('riskForm');
const resetBtn = document.querySelector('button[type="reset"]');

async function wakeServer(){
  try {
    console.log('Calling ping API...');
    const response = await fetch(`${API_BASE_URL}/ping`);
    const data = await response.json();
    console.log('Ping API response received:', data);
  } catch (error) {
    console.error('Ping API error:', error);
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const age = Number(document.getElementById('age').value);
  const feet = Number(document.getElementById('feet').value);
  const inches = Number(document.getElementById('inches').value);
  const weight = Number(document.getElementById('weight').value);
  const systolic = Number(document.getElementById('systolic').value);
  const diastolic = Number(document.getElementById('diastolic').value);

  const diabetes = document.getElementById('diabetes').checked;
  const cancer = document.getElementById('cancer').checked;
  const alzheimers = document.getElementById('alzheimers').checked;

  // for now just log everything
  console.log({
    age,
    feet,
    inches,
    weight,
    systolic,
    diastolic,
    diabetes,
    cancer,
    alzheimers
  });

  // TEMPORARY RESULTS (so UI works)
  showFakeResults();
});

function showFakeResults() {
  document.querySelectorAll('.result-value')[0].textContent = '27.8';
  document.querySelectorAll('.result-value')[1].textContent = 'overweight';
  document.querySelectorAll('.result-value')[2].textContent = 'stage 1';
  document.querySelectorAll('.result-value')[3].textContent = '60';
  document.querySelectorAll('.result-value')[4].textContent = 'high risk';
}


resetBtn.addEventListener('click', function () {
  const results = document.querySelectorAll('.result-value');

  results.forEach(r => r.textContent = '--');
});

wakeServer();


