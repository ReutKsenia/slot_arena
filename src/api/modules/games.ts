import type { RecordsPagesResponse } from '@/types/api/records.types';
import {
  type GameLink,
  type GameEntity,
} from '@/types/api/games.types';

import { get, post } from '@/api';

import { GAMES_LINK } from '@/constants/requests';

export const fetchGames = async (): Promise<Array<GameEntity>> => {
  const data = await get<RecordsPagesResponse<GameEntity>>(`${GAMES_LINK}?clientId=default`);
  const response: Array<GameEntity> = data.data;

  return response;
};

export const fetchGameLink = async (gameId: string): Promise<GameLink> => {
    const data = await post<RecordsPagesResponse<GameLink>>(`${GAMES_LINK}/${gameId}/session-demo?clientId=default`, {gameId});
    const response: GameLink = data.data[0];
  
    return response;
  };