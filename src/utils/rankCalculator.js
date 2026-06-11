import { rankTiers } from '../data/rankConfig';

/**
 * Returns the rank object for a given completion percentage.
 */
export function getRank(percentage) {
  for (const tier of rankTiers) {
    if (percentage >= tier.minPercentage) {
      return { ...tier, percentage };
    }
  }
  return { ...rankTiers[rankTiers.length - 1], percentage };
}

/**
 * Calculates the next rank threshold and progress towards it.
 */
export function getRankProgress(percentage) {
  const currentRank = getRank(percentage);
  const currentIndex = rankTiers.findIndex(t => t.rank === currentRank.rank);
  const nextRank = currentIndex > 0 ? rankTiers[currentIndex - 1] : null;

  return {
    current: currentRank,
    next: nextRank,
    progressToNext: nextRank
      ? ((percentage - currentRank.minPercentage) / (nextRank.minPercentage - currentRank.minPercentage)) * 100
      : 100,
  };
}
