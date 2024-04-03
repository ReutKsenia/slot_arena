export interface AuthorizationUserInfo {
    login: string;
    balance?: BalanceEntity[]
  }

export interface BalanceDto {
    auth: string;
}

export interface BalanceEntity {
    id: string;
    type: string;
    attributes: BalanceAttributes;
}

export interface BalanceAttributes {
    currency: string;
    available: number;
    'in-play': number;
    bonus: number;
}