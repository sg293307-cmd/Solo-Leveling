import React from 'react';
import { RankBanner } from '../components/analytics/RankBanner';
import { YearlyBarChart } from '../components/analytics/YearlyBarChart';
import { HealthSummaryTable } from '../components/analytics/HealthSummaryTable';
import { AnnualHeatmap } from '../components/analytics/AnnualHeatmap';
import { QuarterlyGauges } from '../components/analytics/QuarterlyGauges';
import { calcYearToDateCompletion, calcAnnualMonthlyRates, calcHealthAverages, calcAnnualHeatmap, calcQuarterlyRates } from '../utils/statsCalculator';
import { getRank, getRankProgress } from '../utils/rankCalculator';

export function AnnualAnalytics({ data }) {
  const { currentYear } = data.settings;
  const { dailyLog, dailyHabits, healthMetrics } = data;

  // Calculate all required metrics
  const ytdStats = calcYearToDateCompletion(dailyLog, dailyHabits, currentYear);
  const { current: currentRank, next: nextRank, progressToNext } = getRankProgress(ytdStats.percentage);
  
  const monthlyRates = calcAnnualMonthlyRates(dailyLog, dailyHabits, currentYear);
  const healthAverages = calcHealthAverages(healthMetrics, currentYear);
  const heatmapData = calcAnnualHeatmap(dailyLog, dailyHabits, currentYear);
  const quarterlyRates = calcQuarterlyRates(monthlyRates);

  return (
    <div className="flex flex-col gap-6 animate-in">
      <div className="flex justify-between items-end mb-2">
        <h2 className="text-xl font-bold tracking-widest text-slate-800 dark:text-slate-100 uppercase border-b border-slate-300 dark:border-slate-700 pb-2 flex-1">
          Annual Dashboard <span className="text-cyan-500 ml-2">{currentYear}</span>
        </h2>
      </div>

      <RankBanner 
        currentRank={currentRank} 
        nextRank={nextRank} 
        progressToNext={progressToNext} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <YearlyBarChart monthlyRates={monthlyRates} />
        </div>
        <div className="lg:col-span-4 flex flex-col justify-center p-6 bg-slate-100/50 dark:bg-slate-900/30 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-center">
            <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4">
              Year To Date
            </h3>
            <div className="text-5xl font-black text-slate-800 dark:text-white mb-2">
              {ytdStats.percentage}%
            </div>
            <div className="text-sm font-medium text-slate-500">
              {ytdStats.completed} total habits completed
            </div>
          </div>
        </div>
      </div>

      <HealthSummaryTable averages={healthAverages} />

      <QuarterlyGauges quarterlyRates={quarterlyRates} />

      <AnnualHeatmap heatmapData={heatmapData} year={currentYear} />
    </div>
  );
}
