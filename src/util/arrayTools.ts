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
const sumNextSimilar = (matrix: ItemSquare[]) => {
    let tempStartArray = [] as ItemSquare[];
    let tempStartArray2 = [] as ItemSquare[];
    let useIndex = [] as number[];
    for (let i = 0; i < matrix.length; i++) {
        if (useIndex.some(s => s == i)) {
            matrix[i].val = 0;
            tempStartArray2.push(matrix[i]);
        } else {
            if (matrix[i + 1] !== undefined && matrix[i].val == matrix[i + 1].val) {
                let tempItem = matrix[i];
                tempItem.val = matrix[i].val + matrix[i].val;
                tempStartArray.push(tempItem);
                useIndex.push(i + 1);
            } else {
                tempStartArray.push(matrix[i]);
            }
        }

    }
    return tempStartArray.concat(tempStartArray2);
}

const get4SubArray = (matrix: ItemSquare[], size: number): ItemSquare[][] => {

    let sortArr = matrix.sort((a, b) => a.indexNum - b.indexNum);

    let subarray = [];
    for (let i = 0; i < Math.ceil(sortArr.length / size); i++) {
        subarray[i] = sortArr.slice((i * size), (i * size) + size);
    }
    return subarray;
}
const moveHelp = (subarray: ItemSquare[][], left: boolean) => {
    let newArray = [] as ItemSquare[];
    subarray.forEach(s => {
        let index = s.map(r => r.indexNum);
        let startArray = [] as ItemSquare[];
        let endArray = [] as ItemSquare[];


        if(!left){
            s=s.reverse();
        }
        for (let i = 0; i < s.length; i++) {
            if (left) {
                if (s[i].val > 0) {
                    s[i].indexNum = index.shift() as number;
                    startArray.push(s[i])
                } else {
                    s[i].indexNum = index.pop() as number;
                    endArray.push(s[i])
                }
            } else {
                if (s[i].val > 0) {
                    s[i].indexNum = index.pop() as number;
                    endArray.push(s[i])
                } else {
                    s[i].indexNum = index.shift() as number
                    startArray.push(s[i])
                }
            }
        }

        //sum next similar element
        // if (left){
        //     startArray = sumNextSimilar(startArray);
        // }
        // else {
        //     endArray= sumNextSimilar(startArray);
        // }

        newArray = newArray.concat(startArray.concat(endArray))
    })
    return newArray.sort((a, b) => a.index - b.index);
}

export const moveLeft = (matrix: ItemSquare[]) => {
    let sortArr = matrix.sort((a, b) => a.indexNum - b.indexNum);
    let subarray = get4SubArray(sortArr, 4);

    return moveHelp(subarray, true);
}
export const moveRight = (matrix: ItemSquare[]) => {
    let sortArr = matrix.sort((a, b) => a.indexNum - b.indexNum);
    let subarray = get4SubArray(sortArr, 4);

    return moveHelp(subarray, false);
}

export const moveDown = (matrix: ItemSquare[]) => {
    let sortArr = matrix.sort((a, b) => a.indexNum - b.indexNum);
    let subarray = get4SubArray(sortArr, 4);
    rotate(subarray)
    sortArr = moveHelp(subarray, true).sort((a, b) => a.indexNum - b.indexNum);

    subarray = get4SubArray(sortArr, 4);
    return subarray.reduce((acc, item) => {
        return acc.concat(item);
    }, [] as ItemSquare[])
}

export const moveUp = (matrix: ItemSquare[]) => {
    let sortArr = matrix.sort((a, b) => a.indexNum - b.indexNum);
    let subarray = get4SubArray(sortArr, 4);
    rotate(subarray)
    sortArr = moveHelp(subarray, false).sort((a, b) => a.indexNum - b.indexNum);

    subarray = get4SubArray(sortArr, 4);
    rotate(subarray)
    rotate(subarray)
    rotate(subarray)
    return subarray.reduce((acc, item) => {
        return acc.concat(item);
    }, [] as ItemSquare[])
}