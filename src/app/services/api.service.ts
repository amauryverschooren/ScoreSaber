import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProfileData(id){
    return this.http.get<IPlayer>("https://new.scoresaber.com/api/player/" + id +  "/full")
  }
  getTopSongs(id){
    return this.http.get<ISongsRoot>("https://new.scoresaber.com/api/player/" + id +  "/scores/top")
  }
  getRecentSongs(id){
    return this.http.get<ISongsRoot>("https://new.scoresaber.com/api/player/" + id +  "/scores/recent")
  }
}

export interface PlayerInfo {
    playerId: string;
    playerName: string;
    avatar: string;
    rank: number;
    countryRank: number;
    pp: number;
    country: string;
    role: string;
    badges: any[];
    history: string;
    permissions: number;
    inactive: number;
    banned: number;
}
export interface ScoreStats {
    totalScore: number;
    totalRankedScore: number;
    averageRankedAccuracy: number;
    totalPlayCount: number;
    rankedPlayCount: number;
}
export interface IPlayer {
    playerInfo: PlayerInfo;
    scoreStats: ScoreStats;
}

export interface ISongs {
  rank: number;
  scoreId: number;
  score: number;
  unmodififiedScore: number;
  mods: string;
  pp: number;
  weight: number;
  timeSet: Date;
  leaderboardId: number;
  songHash: string;
  songName: string;
  songSubName: string;
  songAuthorName: string;
  levelAuthorName: string;
  difficulty: number;
  difficultyRaw: string;
  maxScore: number;
}
export interface ISongsRoot {
  scores: ISongs[];
}