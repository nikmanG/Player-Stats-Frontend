import { Player } from './player'

export interface Duelist {
    id: number;
    player: Player;
    elo: number;
    wins: number;
    losses: number;
}