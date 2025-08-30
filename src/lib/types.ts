
export type Point = { t: number; value: number };

export type Stats = {
  sharpe: number;
  sortino: number;
  maxDD: number;   // %, додатне
  winRate: number; // %
};

export type PerformanceResponse = {
  pnl: Point[];
  drawdown: Point[];
  stats: Stats;
};

export type Candle = { t: number; o: number; h: number; l: number; c: number; v: number };

export type PricesResponse = {
  pair: string;
  tf: string;
  candles: Candle[];
};

export type Position = {
  id: string;
  symbol: string;
  side: "LONG" | "SHORT";
  qty: number;
  entry: number;
  mark: number;
  pnl: number;     // $
  riskPct: number; // % від еквіті
};

export type Trade = {
  id: string;
  ts: number;
  symbol: string;
  side: "BUY" | "SELL";
  qty: number;
  price: number;
  fee: number;
  pnl?: number;
};

// Нормалізовані точки під графіки
export type PnLPoint = { t: number; pnl: number };
export type DDPoint  = { t: number; dd: number };
