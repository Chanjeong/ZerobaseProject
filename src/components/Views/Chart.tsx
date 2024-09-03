import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import { useLogin } from '../Provider/LoginProvider';
import styles from '../Assets/css/Chart.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart() {
    const { id } = useParams<{ id: string }>();
    const { loggedInUser } = useLogin();

    const account = loggedInUser?.account.find((v) => v.id === id);

    const monthlyData = useMemo(() => {
        const data = {
            income: Array(12).fill(0),
            expense: Array(12).fill(0),
        };

        account?.transaction.forEach((transaction) => {
            const date = new Date(transaction.date);
            const month = date.getMonth();

            if (transaction.type === 'deposit') {
                data.income[month] += transaction.money;
            } else if (transaction.type === 'transfer') {
                data.expense[month] += transaction.money;
            }
        });

        return data;
    }, [account]);

    const data = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: [
            {
                label: '수입',
                data: monthlyData.income,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
                label: '지출',
                data: monthlyData.expense,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: '월별 수입과 지출',
            },
        },
    };

    return (
        <div className={styles.chartContainer}>
            <Bar data={data} options={options} />
        </div>
    );
}
