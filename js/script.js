let sendButton = document.querySelector('button');
const chartContainer01 = document.getElementById('charts-container-01');
const allInputs = document.querySelectorAll('input[type="radio"]');



const inverseBtn = document.getElementById('showInverseBtn');
inverseBtn.addEventListener('change', () => {
    document.body.classList.toggle('showInverse');
});



function toggleDisabledButton(toDisabled = true){
    if(toDisabled){
        sendButton.setAttribute('disabled', 'disabled');
    }else{
        sendButton.removeAttribute('disabled');
    }
}


const allAttrakdiffSpan = document.querySelectorAll('span[data-attrakdiff]');
const spanCount = allAttrakdiffSpan.length;


function calculAverage(data){
    var average = data.reduce((a, b) => a + b, 0) / data.length
    return average.toFixed(2);
}



allInputs.forEach(input => {
    input.addEventListener('change', () => {
        let numInputChecked = document.querySelectorAll('input[type="radio"]:checked').length;
        if(numInputChecked === spanCount){
            toggleDisabledButton(false);
        }
    });
});


let iteration = 1;
sendButton.addEventListener('click', (e) => {

    // Clear array
    let qp_array = [];
    let qhs_array = [];
    let qhi_array = [];
    let att_array = [];
    let dataChart = [];

    // Clear Average
    let qp_average = 0;
    let qhs_average = 0;
    let qhi_average = 0;
    let att_average = 0;

    allAttrakdiffSpan.forEach(span => {
        var spanType = span.dataset.attrakdiff;
        var selectedValue = Number(span.querySelector('input:checked').value);

        if(span.dataset.inverse === 'inverse') selectedValue = selectedValue * (-1);

        switch (spanType){
            case 'QP':
                qp_array.push(selectedValue);
                break;

            case 'QHS':
                qhs_array.push(selectedValue);
                break;

            case 'QHI':
                qhi_array.push(selectedValue);
                break;

            case 'ATT':
                att_array.push(selectedValue);
                break;

            default:
                console.log(`Sorry, ${spanType} doesn't exist.`);
                break;
        }
    });

    // Calcul Average
    qp_average = calculAverage(qp_array);
    qhs_average = calculAverage(qhs_array);
    qhi_average = calculAverage(qhi_array);
    att_average = calculAverage(att_array);

    dataChart.push(qp_average);
    dataChart.push(qhs_average);
    dataChart.push(qhi_average);
    dataChart.push(att_average);



    // CHARTS

    const newChart = document.createElement("canvas");
    newChart.id = 'canvas-'+iteration;
    chartContainer01.appendChild(newChart);

    const chartLabels = ['QP', 'QHS', 'QHI', 'ATT'];

    const ctx01 = document.getElementById('canvas-'+iteration);

    var data01 = {
        labels: chartLabels,
        datasets: [{
            label: 'Résultat du test AttrakDiff',
            data: dataChart,
            fill: false,
            borderColor: 'rgb(0, 107, 0)',
            tension: 0.1,
        }]
    }

    var attrakdiffChart = new Chart(ctx01, {
        type: 'line',
        data: data01,
        options: {
            scales: {
                y: {
                    suggestedMin: -3,
                    suggestedMax: 3
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'rgb(0, 0, 0)'
                    }
                }
            }
        }
    });


    // TBL

    const tblValue = document.getElementById('tblValue');
    tblValue.innerHTML = '';

    chartLabels.forEach(data => {
        let newSpan = document.createElement("span");
        let textNode = document.createTextNode(data);
        newSpan.appendChild(textNode);
        tblValue.appendChild(newSpan);
    });

    dataChart.forEach(data => {
        let newSpan = document.createElement("span");
        let textNode = document.createTextNode(data);
        newSpan.appendChild(textNode);
        tblValue.appendChild(newSpan);
    });

    
    iteration++;
});
