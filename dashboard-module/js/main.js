import { SURVEYS_ENDPOINT_URL } from '../../js/constants.js'

// method to initialize charts
const initChart = async () => {
    getData().then(async (response) => {

        // get total count
        document.getElementById('total').innerHTML = response.length

        const delivery = getCountsForDelivery(response, '0')
        const freshness = getCountsForDelivery(response, '1')
        const order_again = getOrderStatus(response, '2')

        renderChartUI(delivery, freshness)
        renderPieChart(order_again)
    })
        .catch((err) => {
            console.log(err)
        })
}

// fetch data from the backend api
const getData = async () => {
    const response = await fetch(SURVEYS_ENDPOINT_URL)
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const results = await response.json();
    return results
}

const getOrderStatus = (response, index) => {
    let yes = 0, no = 0
    response.map((data) => {
        data[index].answer ? yes += 1 : no += 1
    })
    return {
        yes: yes,
        no: no,
    }
}

const getCountsForDelivery = (response, index) => {
    let not_so_great = 0, great = 0, awful = 0
    response.map((data) => {
        switch (data[index].answer) {
            case 'Not so Great':
                not_so_great += 1
                break
            case 'Great':
                great += 1
                break
            case 'Awful':
                awful += 1
                break
        }
    })
    return {
        not_so_great: not_so_great,
        great: great,
        awful: awful
    }
}

const renderChartUI = (delivery, freshness) => {
    var ctx = document.getElementById('barChart').getContext('2d');
    var barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Delivery Experience", "Freshness"],
            datasets: [{
                data: [delivery.great, freshness.great],
                label: "Great",
                borderColor: "rgb(62,149,205)",
                backgroundColor: "rgb(62,149,205,0.1)",
                borderWidth: 2
            }, {
                data: [delivery.not_so_great, freshness.not_so_great],
                label: "Not so Great",
                borderColor: "rgb(60,186,159)",
                backgroundColor: "rgb(60,186,159,0.1)",
                borderWidth: 2
            }, {
                data: [delivery.awful, freshness.awful],
                label: "Awful",
                borderColor: "rgb(255,165,0)",
                backgroundColor: "rgb(255,165,0,0.1)",
                borderWidth: 2
            }
            ]
        },
    });
}

const renderPieChart = (payload) => {
    var ctx = document.getElementById('pieChart').getContext('2d');
    var pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Yes, Definitely!", "No, Never again."],
            datasets: [{
                data: [payload.yes, payload.no],
                borderColor: [
                    "#3cba9f",
                    "#ffa500",
                ],
                backgroundColor: [
                    "rgb(60,186,159,0.1)",
                    "rgb(255,165,0,0.1)",
                ],
                borderWidth: 2,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: false,
                }],
                yAxes: [{
                    display: false,
                }],
            }
        },
    });
}

initChart()