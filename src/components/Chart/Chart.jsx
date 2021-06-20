import React, { useState, useEffect } from 'react';
import { fetchDailyDate } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ( { data: { confirmed, deaths, recovered }, country} ) => {
    const [dailyData, setdailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setdailyData(await fetchDailyDate());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData[0] ? (
          <Line
            data={{
              labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
              datasets: [{
                data: dailyData.map((data) => data.confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
              }, {
                data: dailyData.map((data) => data.deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              },  {
                data: dailyData.map((data) => data.recovered),
                label: 'Recovered',
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
                fill: true,
              },
              ],
            }}
          />
        ) : null
      );
    

    const barChart = (
        confirmed ? (
          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` },
            }}
          />
        ) : null
      );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;
