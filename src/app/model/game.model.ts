export class Tile {
    index: Index;
    hasMushroom: boolean;
    constructor(i: Index) {
        this.index = i;
        this.hasMushroom = false;
    }
}

export class Mario {
    tile: Tile;
    direction: Directions;
    constructor(tile: Tile) {
        this.tile = tile;
    }
}

export class Score {
    moveCount = 0;
    mashroomCount = 0;
}

export class Index {
    rowIndex: number;
    columnIndex: number;
}

export class Player {
    index: Index;
}

export class Mushroom {
    index: Index;
}

export enum Directions {
    up = 'up',
    right = 'right',
    down = 'down',
    left = 'left'
}
