import {ItemSquare} from "../type/ItemSquare";

export const rotate = (matrix: ItemSquare[][]) => {
    const n = matrix.length;
    const x = Math.floor(n / 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
        for (let j = i; j < y - i; j++) {
            const k = matrix[i][j];
            matrix[i][j] = matrix[y - j][i];
            matrix[y - j][i] = matrix[y - i][y - j];
            matrix[y - i][y - j] = matrix[j][y - i]
            matrix[j][y - i] = k
        }
    }
    return matrix;
}
export const moveLeft = (matrix: ItemSquare[][]) => {
    return matrix.map((row) => {
        let startArray: number[] = [];
        let endArray: number[] = [];
        row.forEach(col => {
            if (col.val > 0) {
                startArray.push(col.val);
            } else {
                endArray.push(0);
            }
        })
        let tempArr = startArray.concat(endArray);
        let sumTempArr: number[] = [];

        for (let i = 0; i < tempArr.length; i++) {
            if (tempArr[i + 1] !== undefined && tempArr[i] == tempArr[i + 1]) {
                sumTempArr.push(tempArr[i] + tempArr[i + 1]);
                i++;
            } else {
                sumTempArr.push(tempArr[i])
            }
        }
        while (sumTempArr.length < tempArr.length) {
            sumTempArr.push(0);
        }

        return row.map((r, i) => {
            r.val = sumTempArr[i];
            return r;
        })
    })
}
export const moveRight = (matrix: ItemSquare[][]) => {
    return matrix.map((row) => {
        let startArray: number[] = [];
        let endArray: number[] = [];
        row.forEach(col => {
            if (col.val > 0) {
                endArray.push(col.val);
            } else {
                startArray.push(0);
            }
        })
        let tempArr = startArray.concat(endArray);
        const tempArrReverse = tempArr.reverse();
        let tempArrSum: number[] = [];

        for (let i = 0; i < tempArrReverse.length; i++) {
            if (tempArrReverse[i + 1] !== undefined && tempArrReverse[i] == tempArrReverse[i + 1]) {
                tempArrSum.push(tempArrReverse[i] + tempArrReverse[i + 1]);
                i++;
            } else {
                tempArrSum.push(tempArrReverse[i]);
            }
        }
        while (tempArrSum.length < tempArrReverse.length) {
            tempArrSum.push(0);
        }
        tempArr = tempArrSum.reverse();


        return row.map((r, i) => {
            r.val = tempArr[i];
            return r;
        })
    })
}
