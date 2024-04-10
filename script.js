document.getElementById('confirmCancellation').addEventListener('click', function () {
    sendCancellationRequest(true);
});

document.getElementById('declineCancellation').addEventListener('click', function () {
    sendCancellationRequest(false);
});

function sendCancellationRequest(isCancelled) {
    // Замените URL на адрес вашего Flow в Power Automate
    fetch('https://your-flow-url', {
        method: 'POST',
        body: JSON.stringify({ cancelled: isCancelled, orderID: 'order id' }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // Предполагается, что Flow возвращает JSON с полем, указывающим на успешность операции
            if (data.isCancelled) {
                alert('The order is successfully canceled');
            } else {
                alert('The order is not cancelled');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was a problem with your request');
        });
}
