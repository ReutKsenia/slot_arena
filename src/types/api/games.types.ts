export interface GameEntity {
    id: string;
    type: string;
    attributes: GameAttributes;
}

export interface GameAttributes {
    title: string;
    provider: string;
    categories: Array<string>;
    devices: Array<string>;
    image: string;
    table: string | null;
    'provider-game-id': string;
    'limit-id': string | null;
    'is-mini-game': boolean;
    'is-new': boolean;
    'is-single-currency': boolean;
    'is-favorite': boolean;
    'has-freespins': boolean;
    'has-demo': boolean;
    'tags': Array<string> | null;
    'launch-options': {
        strategy: string;
    },
    'creation-date': Date,
    'new-activation-date': Date | null;
}

export interface GameLink {
    id: string;
    type: string;
    attributes: GameLinkAttributes;
}

export interface GameLinkAttributes {
    'launch-options': {
        'game-url': string;
        strategy: string;
    }
}