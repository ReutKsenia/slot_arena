import type { RecordsPagesResponse } from '@/types/api/records.types';
import {
  type BalanceDto,
  type BalanceEntity,
} from '@/types/api/users.types';

import { get } from '@/api';

import { USER_LINK } from '@/constants/requests';

export const fetchBalance = async (
  params: BalanceDto,
): Promise<RecordsPagesResponse<BalanceEntity>> => {
  const data = await get<RecordsPagesResponse<BalanceEntity>>(`${USER_LINK}/balance`, { params });

  return data;
};