import React from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LineElement, Chart as ChartJS, LinearScale, PointElement} from 'chart.js';
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);
import "./Graph.css"

const Graph = () => {
  
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'], 
        datasets: [
            {
                label: 'Emotion Score', 
                data: [
                    { x: 'January', y: 4 }, 
                    { x: 'February', y: 6 }, 
                    { x: 'March', y: 4 }, 
                    { x: 'April', y: 6 }, 
                    { x: 'May', y: 2 }, 
                    { x: 'June', y: 4 }, 
                ],
                fill: false,
                borderColor: 'red',
                pointBackgroundColor: 'black',
                tension: 0.1
            },

            {
                label: 'Emotion Score', 
                data: [
                    { x: 'January', y: 5 }, 
                    { x: 'February', y: 4 }, 
                    { x: 'March', y: 2 }, 
                    { x: 'April', y: 5}, 
                    { x: 'May', y: 4}, 
                    { x: 'June', y: 2 }, 
                ],
                fill: false,
                borderColor: 'pink',
                pointBackgroundColor: 'black',
                tension: 0.1
            },
        
        ]
    };
    // Chart.js options
    const options = {
        scales: {
            y: {
                min: 1, 
                max: 7, 
                ticks: {
                   
                    callback: function(value) {
                        const emotions = ['Depressed', 'Lonely', 'Stressed', 'Worried', 'Neutral', 'Calm', 'Joyful'];
                        const emotionIndex = Math.floor(value - 1);
                        if (emotions[emotionIndex]) {
                            return emotions[emotionIndex];
                        }
                        return ''; 
                    }
                }
            }
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        maxWidth: 400 
    };

    return (
        <div className='graph-container'>
            <Line data={data} options={options}/>
        </div>
    );
};

export default Graph;
