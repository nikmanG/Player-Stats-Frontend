import { Team } from './team';
import { Player } from './player';

export interface QuidditchMatch {
    winner: Team;
    loser: Team;
    winnerScore: number;
    loserScore: number;
    snitchCatcher: Player;
}