export interface UserStats {
  user: string;
  stats: TrafficStats;
}

export interface TrafficStats {
  downloaded: string;
  uploaded: string;
}
