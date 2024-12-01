let calculateButton = $('#calculateButton');
const successfulResults = $('#successfulResults');
const unsuccessfulResults = $('#unsuccessfulResults');
let totalSuccesses = 0;
let totalFailures = 0;

calculateButton.on('click', () => {
    calculateButton.text('Calculating...');
    calculateButton.prop('disabled', true);

    setTimeout(() => {
        const minValue = parseInt($('#minValue').val());
        const maxValue = parseInt($('#maxValue').val());
        const successRate = parseFloat($('#successRate').val());
        const trialCount = parseInt($('#trialCount').val());
        const totalSuccessesSpan = $('#totalSuccesses');
        const totalFailuresSpan = $('#totalFailures');

        let closeResultDetails = 0;
        successfulResults.val('');
        unsuccessfulResults.val('');

        if(trialCount>10000) {
            closeResultDetails = 1;
        }

        for (let i = 0; i < trialCount; i++) {
            const dateTime = new Date().toLocaleString();
            const randomNumber = (Math.random() * (maxValue - minValue)) + minValue;
            const result = randomNumber <= successRate ? 'Success' : 'Failure';
            
            resultDetails(dateTime,i,result,randomNumber,closeResultDetails);
            
        }

        totalSuccessesSpan.text(totalSuccesses);
        totalFailuresSpan.text(totalFailures);

        calculateButton.text('Calculate');
        calculateButton.prop('disabled', false);
    }, 0);
});

// function resultDetails(dateTime,i,result,randomNumber,closeResultDetails) {
//         if (result === 'Success') {
//             if(closeResultDetails==0) {
//                 successfulResults.val((successfulResults.val() || '') + `${dateTime} - Trial ${i+1}: ${result} - (${randomNumber})\n`);
//             }
//             totalSuccesses++;
//         } else {
//             if(closeResultDetails==0) {
//                 unsuccessfulResults.val((unsuccessfulResults.val() || '') + `${dateTime} - Trial ${i+1}: ${result} - (${randomNumber})\n`);
//             }
//             totalFailures++;
//         }
// }

function resultDetails(dateTime, i, result, randomNumber, closeResultDetails) {
    const message = `${dateTime} - Trial ${i + 1}: ${result} - (${randomNumber})\n`;

    if (closeResultDetails == 0) {
        const targetResults = (result === 'Success') ? successfulResults : unsuccessfulResults;
        targetResults.val((targetResults.val() || '') + message);
    }

    if (result === 'Success') {
        totalSuccesses++;
    } else {
        totalFailures++;
    }
}
