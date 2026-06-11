import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { GlassCard } from '../ui/GlassCard';
import { getMonthShortName } from '../../utils/dateUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

export function YearlyBarChart({ monthlyRates }) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const labels = months.map(m => getMonthShortName(m));
  const dataValues = months.map(m => monthlyRates[m] || 0);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: '#22d3ee', // Cyan
        hoverBackgroundColor: '#3b82f6', // Blue
        borderRadius: 4,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        callbacks: {
          label: (context) => `Completion: ${context.raw}%`
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: { family: 'mono', size: 10 },
          callback: (value) => `${value}%`
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: { size: 10, weight: 'bold' }
        }
      }
    },
  };

  return (
    <GlassCard className="h-[300px] flex flex-col p-4">
      <h3 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-4 text-center">
        Yearly Progress
      </h3>
      <div className="flex-1 relative w-full">
        <Bar options={options} data={data} />
      </div>
    </GlassCard>
  );
}
