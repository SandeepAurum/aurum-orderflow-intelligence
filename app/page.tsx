"use client";

import { useEffect, useState } from 'react';

type Summary = {
  nifty: number;
  changePct: number;
  breadth: number;
  adv: number;
  dec: number;
  volume: number;
};

type WatchItem = {
  ticker: string;
  price: number;
  change: number;
  strength: number;
  vol: number;
};

type OrderBookItem = {
  price: number;
  buy: number;
  sell: number;
};

type SetupItem = {
  name: string;
  type: string;
  score: number;
  direction: 'buy' | 'sell';
  note: string;
};

type ScannerItem = {
  stock: string;
  trend: string;
  vol: string;
  breakout: string;
  score: number;
};

type Sector = {
  name: string;
  value: number;
  tone: 'green' | 'blue' | 'amber' | 'red';
};

type MarketData = {
  summary: Summary;
  watchlist: WatchItem[];
  orderbook: OrderBookItem[];
  setups: SetupItem[];
  scanner: ScannerItem[];
  sectors: Sector[];
  profile: number[];
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'orderflow' | 'analytics'>('orderflow');
  const [data, setData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/market', { cache: 'no-store' });
        const payload = await response.json();
        setData(payload);
      } catch (error) {
        console.error('Failed to load market data', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();

    const interval = window.setInterval(() => {
      setData((current) => {
        if (!current) return current;
        return {
          ...current,
          summary: {
            ...current.summary,
            nifty: Number((current.summary.nifty + (Math.random() - 0.35) * 20).toFixed(0)),
            changePct: Number((current.summary.changePct + (Math.random() - 0.5) * 0.5).toFixed(2)),
            volume: Number((current.summary.volume + (Math.random() - 0.4) * 0.15).toFixed(2)),
          },
          watchlist: current.watchlist.map((item) => ({
            ...item,
            price: Number((item.price + (Math.random() - 0.5) * 12).toFixed(1)),
            change: Number((item.change + (Math.random() - 0.5) * 0.8).toFixed(1)),
          })),
        };
      });
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  if (isLoading || !data) {
    return <div className="loading-shell">Loading dashboard…</div>;
  }

  return (
    <main className="dashboard-shell">
      <div className="topbar">
        <div className="brand-block">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Aurum Orderflow Intelligence</div>
            <div className="brand-sub">Market planning dashboard</div>
          </div>
        </div>

        <div className="top-actions">
          <span className="status-pill">EOD + Simulation</span>
          <span className="status-pill neutral">NSE India</span>
        </div>
      </div>

      <div className="tab-bar">
        <button
          className={activeTab === 'orderflow' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('orderflow')}
        >
          ORDERFLOW
        </button>
        <button
          className={activeTab === 'analytics' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('analytics')}
        >
          ANALYTICS
        </button>
      </div>

      <div className="workspace">
        {activeTab === 'orderflow' ? (
          <>
            <section className="panel panel-main">
              <div className="panel-header">
                <div className="kicker">Market pulse</div>
                <span className="status-pill small">Updated live</span>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="label">NIFTY</div>
                  <div className="value">{data.summary.nifty.toLocaleString()} <span className="green">{data.summary.changePct > 0 ? '+' : ''}{data.summary.changePct}%</span></div>
                </div>
                <div className="stat-card">
                  <div className="label">Breadth</div>
                  <div className="value">{data.summary.breadth}% <span className="green">Bullish</span></div>
                </div>
                <div className="stat-card">
                  <div className="label">Adv / Dec</div>
                  <div className="value">{data.summary.adv} / {data.summary.dec}</div>
                </div>
                <div className="stat-card">
                  <div className="label">Volume</div>
                  <div className="value">{data.summary.volume.toFixed(2)}x</div>
                </div>
              </div>

              <div className="chart-shell">
                <div className="chart-line" />
                <div className="chart-grid" />
                <div className="chart-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                </div>
              </div>

              <div className="mini-grid">
                <div className="mini-card">
                  <div className="mini-top">
                    <span>Buy pressure</span>
                    <span className="green">+18.3%</span>
                  </div>
                  <div className="mini-value blue">62.4k</div>
                </div>
                <div className="mini-card">
                  <div className="mini-top">
                    <span>Sell pressure</span>
                    <span className="red">-11.2%</span>
                  </div>
                  <div className="mini-value red">41.7k</div>
                </div>
              </div>
            </section>

            <aside className="panel side-stack">
              <div className="card-block">
                <div className="panel-header compact">
                  <div className="kicker">Watchlist</div>
                  <span className="status-pill small">Top movers</span>
                </div>

                <div className="watchlist">
                  {data.watchlist.map((item) => (
                    <div key={item.ticker} className="watch-row">
                      <div className="watch-ticker">{item.ticker}</div>
                      <div className="watch-body">
                        <div className="watch-price">₹{item.price.toLocaleString()}</div>
                        <div className="volume-bar"><span style={{ width: `${item.vol}%` }} /></div>
                      </div>
                      <div className={item.change >= 0 ? 'value-up' : 'value-down'}>
                        {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-block">
                <div className="panel-header compact">
                  <div className="kicker">Setup ideas</div>
                  <span className="status-pill small">Next day</span>
                </div>

                <div className="setup-list">
                  {data.setups.map((setup) => (
                    <div key={setup.name} className="setup-item">
                      <div className="setup-head">
                        <strong>{setup.name}</strong>
                        <span className={setup.direction === 'buy' ? 'tag buy-tag' : 'tag sell-tag'}>{setup.direction}</span>
                      </div>
                      <div className="setup-score">{setup.score}</div>
                      <div className="setup-type">{setup.type}</div>
                      <p>{setup.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <section className="panel panel-orderbook">
              <div className="card-block full-height">
                <div className="panel-header compact">
                  <div className="kicker">Order flow ladder</div>
                  <span className="status-pill small">Bid / ask</span>
                </div>

                <div className="orderbook-grid">
                  {data.orderbook.map((row, index) => (
                    <div key={`${row.price}-${index}`} className="order-row">
                      <span className="order-price">₹{row.price}</span>
                      <div className="order-bars">
                        <div className="buy-bar" style={{ width: `${row.buy}%` }} />
                        <div className="sell-bar" style={{ width: `${row.sell}%` }} />
                      </div>
                      <span className="buy-label">{row.buy}k</span>
                      <span className="sell-label">{row.sell}k</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="panel panel-analytics-main">
              <div className="card-block">
                <div className="panel-header compact">
                  <div className="kicker">Stock scanner</div>
                  <span className="status-pill small">EOD ranking</span>
                </div>

                <table className="scanner-table">
                  <thead>
                    <tr>
                      <th>Stock</th>
                      <th>Trend</th>
                      <th>Vol</th>
                      <th>Breakout</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.scanner.map((stock) => (
                      <tr key={stock.stock}>
                        <td>{stock.stock}</td>
                        <td>{stock.trend}</td>
                        <td>{stock.vol}</td>
                        <td>{stock.breakout}</td>
                        <td><span className="score-chip">{stock.score}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="panel side-stack">
              <div className="card-block">
                <div className="panel-header compact">
                  <div className="kicker">Sector heat</div>
                  <span className="status-pill small">Relative strength</span>
                </div>

                <div className="sector-grid">
                  {data.sectors.map((sector) => (
                    <div key={sector.name} className={`sector-box ${sector.tone}`}>
                      <div>{sector.name}</div>
                      <strong>{sector.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-block">
                <div className="panel-header compact">
                  <div className="kicker">Volume profile</div>
                  <span className="status-pill small">Daily range</span>
                </div>

                <div className="profile-bars">
                  {data.profile.map((bar, index) => (
                    <div key={`${bar}-${index}`} className="profile-bar" style={{ height: `${bar}%` }} title={`${bar}%`} />
                  ))}
                </div>
              </div>
            </aside>
          </>
        )}
      </div>
    </main>
  );
}
