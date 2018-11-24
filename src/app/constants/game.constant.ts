export const Settings = {
    tileSize: 50,
    speed: 300
};
export enum Directions {
    top = 'top',
    right = 'right',
    bottom = 'bottom',
    left = 'left'
}

export enum GameMode {
    setup= 'setup',
    notStarted = 'notStarted',
    playing = 'playing',
    paused = 'paused',
    lost = 'lost',
    won = 'won',
}

export const DisplayText = {
    [GameMode.setup]: 'Setup',
    [GameMode.notStarted]: 'Press any arrow key to start',
    [GameMode.playing]: 'Playing',
    [GameMode.paused]: 'Paused',
    [GameMode.won]: 'Completed',
    [GameMode.lost]: 'Lost',
};

export const Keys = {
    up: 38,
    right: 39,
    down: 40,
    left: 37,
    esc: 27,
    space: 32,
    enter: 13
};
