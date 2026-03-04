export interface Season {
  strSeason?: string;
  strBadge?: string;
}

export interface SeasonBadgeResponse {
  seasons?: Season[] | null;
}
