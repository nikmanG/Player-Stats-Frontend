import { Player } from './player';

export interface DuelMatch {
    id: number;
    winner: Player;
    loser: Player;
    oldWinnerElo: number;
    oldLoserElo: number;
    newWinnerElo: number;
    newLoserElo: number;
    matchDate: string;
}