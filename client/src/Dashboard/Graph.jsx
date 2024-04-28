import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import "./Graph.css";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

const Graph = () => {
    const [feelingsData, setFeelingsData] = useState([]);

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            axios.get(`http://localhost:4000/detailsRoute/find-feelings?email=${email}`)
                .then(response => {
                    setFeelingsData(response.data.feelings);
                })
                .catch(error => {
                    console.error("Error fetching feelings data:", error);
                });
        }
    }, []);

    const convertEmotionToNumber = (emotion) => {
        switch (emotion) {
            case 'Thriving':
                return 6;
            case 'Flourishing':
                return 5;
            case 'Stable':
                return 4;
            case 'Struggling':
                return 3;
            case 'Distressed':
                return 2;
            case 'Depressed':
                return 1;
            default:
                return 0;
        }
    };

    const formattedData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
            {
                label: 'First Week',
                data: feelingsData.slice(0, 7).map(convertEmotionToNumber),
                borderColor: 'pink',
                fill: false,
            },
            {
                label: 'Second Week',
                data: feelingsData.slice(7, 14).map(convertEmotionToNumber),
                borderColor: 'red',
                fill: false,
            },
        ],
    };

    const options = {
        aspectRatio: 5, // Adjust this value as needed
        scales: {
            y: {
                ticks: {
                    reverse: true,
                    stepSize: 1,
                    min: 1,
                    max: 6,
                    callback: function (value, index, values) {
                        switch (value) {
                            case 6:
                                return 'Thriving';
                            case 5:
                                return 'Flourishing';
                            case 4:
                                return 'Stable';
                            case 3:
                                return 'Struggling';
                            case 2:
                                return 'Distressed';
                            case 1:
                                return 'Depressed';
                            default:
                                return '';
                        }
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
        },
    };
    

    return (
        <div className='graph-container'>
            {feelingsData.length >= 14 ? (
                <Line data={formattedData} options={options} />
            ) : (
                <h2 className='required-days'>Use SerenitySync for 14 days to track your mood.</h2>
            )}
        </div>
    );
};

export default Graph;
