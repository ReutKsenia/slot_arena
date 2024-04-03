import type {
  AuthorizationDtoType,
  AuthorizationResponse,
  AuthorizationResponseAttributes,
  TokenUpdateDto,
} from '@/types/api/auth.types';

import { AUTH_LINK, LOGIN_LINK } from '@/constants/requests';

import { post } from '@/api';
import type { RecordsPagesResponse } from '@/types/api/records.types';

export const fetchAuth = async (
  requestBody: AuthorizationDtoType,
): Promise<RecordsPagesResponse<AuthorizationResponse>> => {
  const response = await post(`${LOGIN_LINK}?clientId=default`, requestBody);

  return response;
};

export const fetchUpdateToken = async (
  requestBody: TokenUpdateDto,
): Promise<AuthorizationResponseAttributes> => {
  const response = await post(`${AUTH_LINK}/token`, requestBody);

  return response;
};