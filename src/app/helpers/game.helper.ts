import { Index } from '../model/game.model';

export class GameHelper {
    public static getRandomNumberBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    public static getUniqueRandomNumbers(n: number, min: number, max: number): Array<number> {
        const arr = [];
        while (arr.length < n) {
            const random = GameHelper.getRandomNumberBetween(min, max);
            if (!arr.includes(random)) {
                arr.push(random);
            }
        }
        return arr;
    }

    public static getUniqueRandomIndexes(n: number, rows: number, columns: number) {
        const array: Index[] = [];
        if (n && rows && columns) {
            while (array.length < n) {
                const randomRow = GameHelper.getRandomNumberBetween(0, rows - 1);
                const randomColumn = GameHelper.getRandomNumberBetween(0, columns - 1);
                if (!(randomRow === 0 && randomColumn === 0) &&
                    array.filter((element: Index) => element.rowIndex === randomRow && element.columnIndex === randomColumn).length === 0) {
                    array.push({ rowIndex: randomRow, columnIndex: randomColumn });
                }
            }
        }
        return array;

    }
}
