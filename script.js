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

async function getBmi(feet, inches, weight) {
  try {
    console.log('Calling BMI API...');

    const response = await fetch(
      `${API_BASE_URL}/bmi?weightLbs=${weight}&heightFeet=${feet}&heightInches=${inches}`
    );

    if (!response.ok){
      throw new Error(`BMI API failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('BMI API response received:', data);
    return data;
  } catch (error) {
    console.error('BMI API error:', error);
    throw error;
  }
}

async function getBpCategory(systolic, diastolic) {
  try {
    console.log('Calling BP Category API...');

    const response = await fetch(
      `${API_BASE_URL}/bp-category?systolic=${systolic}&diastolic=${diastolic}`
    );

    if (!response.ok) {
      throw new Error(`BP Category API failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('BP Category API response received:', data);
    return data;
  } catch (error) {
    console.error('BP Category API error:', error);
    throw error;
  }
}

async function getRiskCategory(age, bmiCategory, bpCategory, diabetes, cancer, alzheimers) {
  try {
     console.log('Calling Risk Category API...');
     
     const diabetesValue = diabetes ? 'yes' : 'no';
     const cancerValue = cancer ? 'yes' : 'no';
     const alzheimersValue = alzheimers ? 'yes' : 'no';
     
     const response = await fetch(
      `${API_BASE_URL}/risk-category?age=${age}` +
      `&bmi=${encodeURIComponent(bmiCategory)}` +
      `&bp=${encodeURIComponent(bpCategory)}` +
      `&diabetes=${diabetesValue}` +
      `&cancer=${cancerValue}` +
      `&alzheimers=${alzheimersValue}`
    );

    if (!response.ok) {
      throw new Error(`Risk Category API failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Risk Category API response received:', data);
    return data;
  } catch (error) {
    console.error('Risk Category API error:', error);
    throw error;
  }
}



function displayResults(bmiData, bpData, riskData) {
  const resultValues = document.querySelectorAll('.result-value');

  resultValues[0].textContent = bmiData.bmi ?? '--';
  resultValues[1].textContent = bmiData.category ?? '--';
  resultValues[2].textContent = bpData.category ?? '--';
  resultValues[3].textContent = riskData.totalPoints ?? '--';
  resultValues[4].textContent = riskData.riskCategory ?? '--';
}

form.addEventListener('submit', async function (event) {
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

  console.log('Form submitted with values:', {
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

  try {
    const bmiData = await getBmi(feet, inches, weight);
    const bpData = await getBpCategory(systolic, diastolic);

    const riskData = await getRiskCategory(
      age,
      bmiData.category,
      bpData.category,
      diabetes,
      cancer,
      alzheimers
    );

    displayResults(bmiData, bpData, riskData);
  } catch (error) {
    console.error('Error calculating risk:', error);
    alert('There was a problem connecting to the API server.');
  }
});

resetBtn.addEventListener('click', function () {
  const results = document.querySelectorAll('.result-value');

  results.forEach(r => r.textContent = '--');
});

wakeServer();


