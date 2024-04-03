export type AuthorizationDtoType = {
    login: string;
    password: string;
  };
export interface AuthorizationResponse {
  id: string;
  type: string;
  attributes: AuthorizationResponseAttributes;
}
  
export interface ErrorType {
  source: any;
  detail: string;
}
  
export interface AuthorizationResponseAttributes {
  token: string;
  tokenType: string;
  'refresh-token': string;
  'life-time': number;
  'need-tfa': boolean;
}

export type TokenUpdateDto = {
  refreshToken: string;
};
