import { Player } from './player'

export interface Team {
    id: number;
    name: string;
    teamType: string;
    wins: number;
    losses: number;
    players: Player[];
}