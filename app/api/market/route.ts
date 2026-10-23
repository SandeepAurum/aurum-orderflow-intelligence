export const dynamic = 'force-dynamic';

const summary = {
  nifty: 24812,
  changePct: 1.22,
  breadth: 61,
  adv: 1390,
  dec: 720,
  volume: 1.87,
};

const watchlist = [
  { ticker: 'RELIANCE', price: 2942.6, change: 2.8, strength: 76, vol: 62 },
  { ticker: 'TCS', price: 3865.7, change: 1.6, strength: 70, vol: 48 },
  { ticker: 'HDFCBANK', price: 1745.2, change: 0.9, strength: 58, vol: 36 },
  { ticker: 'INFY', price: 1578.3, change: 1.1, strength: 66, vol: 54 },
  { ticker: 'SBIN', price: 833.4, change: 1.8, strength: 71, vol: 60 },
];

const orderbook = [
  { price: 2945, buy: 70, sell: 18 },
  { price: 2942, buy: 58, sell: 20 },
  { price: 2939, buy: 40, sell: 25 },
  { price: 2936, buy: 26, sell: 30 },
  { price: 2933, buy: 18, sell: 42 },
  { price: 2930, buy: 12, sell: 50 },
];

const setups = [
  { name: 'Reliance', type: 'Breakout Retest', score: 84, direction: 'buy', note: 'Strong accumulation after reclaim of VWAP.' },
  { name: 'ICICI Bank', type: 'Volume Spike', score: 78, direction: 'buy', note: 'High relative strength with rising participation.' },
  { name: 'ITC', type: 'Range Expansion', score: 71, direction: 'sell', note: 'Weak follow-through near local supply zone.' },
];

const scanner = [
  { stock: 'RELIANCE', trend: 'Bullish', vol: 'High', breakout: 'Above VWAP', score: 88 },
  { stock: 'SBIN', trend: 'Bullish', vol: 'High', breakout: 'Range Break', score: 84 },
  { stock: 'TCS', trend: 'Neutral', vol: 'Medium', breakout: 'Base Build', score: 72 },
  { stock: 'INFY', trend: 'Bullish', vol: 'Moderate', breakout: 'Trend Continuation', score: 77 },
  { stock: 'ITC', trend: 'Bearish', vol: 'Low', breakout: 'Failed Breakout', score: 46 },
];

const sectors = [
  { name: 'Auto', value: 78, tone: 'green' },
  { name: 'IT', value: 64, tone: 'blue' },
  { name: 'Bank', value: 72, tone: 'green' },
  { name: 'Energy', value: 81, tone: 'green' },
  { name: 'FMCG', value: 53, tone: 'amber' },
  { name: 'Metal', value: 49, tone: 'red' },
];

const profile = [18, 26, 38, 60, 52, 48, 66, 72, 58, 44, 30, 18];

export async function GET() {
  return Response.json({
    summary,
    watchlist,
    orderbook,
    setups,
    scanner,
    sectors,
    profile,
  });
}
