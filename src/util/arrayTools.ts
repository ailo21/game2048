import {IItemSquare} from "../type/IItemSquare";

export const rotate = (matrix: IItemSquare[][]) => {
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
const sumNextSimilar = (matrix: IItemSquare[], isLeft: boolean) => {
    if (!isLeft) {
        matrix = matrix.sort((a, b) => a.indexNum - b.indexNum);
    }
    let tempStartArray = [] as IItemSquare[];

    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i + 1] !== undefined && matrix[i].val == matrix[i + 1].val) {
            let tempItem = matrix[i];
            tempItem.val = matrix[i].val + matrix[i].val;
            tempStartArray.push(tempItem);

            matrix = matrix.map((obj, index, arr) => {
                if (obj.indexNum > matrix[i + 1].indexNum) {
                    return obj;
                } else {
                    if (arr[index + 1] !== undefined) {
                        obj.val = matrix[index + 1].val;
                    } else {
                        obj.val = 0;
                    }
                    return obj;
                }

            });
        } else {
            tempStartArray.push(matrix[i]);
        }
    }


    return tempStartArray;
}

const get4SubArray = (matrix: IItemSquare[], size: number): IItemSquare[][] => {

    let sortArr = matrix.sort((a, b) => a.indexNum - b.indexNum);

    let subarray = [];
    for (let i = 0; i < Math.ceil(sortArr.length / size); i++) {
        subarray[i] = sortArr.slice((i * size), (i * size) + size);
    }
    return subarray;
}
const moveHelp = (subarray: IItemSquare[][], left: boolean) => {
    let newArray = [] as IItemSquare[];
    subarray.forEach(s => {
        let index = s.map(r => r.indexNum);
        let startArray = [] as IItemSquare[];
        let endArray = [] as IItemSquare[];


        if (!left) {
            s = s.reverse();
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
        if (left) {
            startArray = sumNextSimilar(startArray, left);
        } else {
            endArray = sumNextSimilar(endArray, left);
        }

        newArray = newArray.concat(startArray.concat(endArray))
    })
    return newArray.sort((a, b) => a.index - b.index);
}

export const moveLeft = (matrix: IItemSquare[]) => {
    let sortArr = matrix.sort((a, b) => a.indexNum - b.indexNum);
    let subarray = get4SubArray(sortArr, 4);

    return moveHelp(subarray, true);
}
export const moveRight = (matrix: IItemSquare[]) => {
    let sortArr = matrix.sort((a, b) => a.indexNum - b.indexNum);
    let subarray = get4SubArray(sortArr, 4);

    return moveHelp(subarray, false);
}

export const moveDown = (matrix: IItemSquare[]) => {
    let sortArr = matrix.sort((a, b) => a.indexNum - b.indexNum);
    let subarray = get4SubArray(sortArr, 4);
    rotate(subarray)
    sortArr = moveHelp(subarray, true).sort((a, b) => a.indexNum - b.indexNum);

    subarray = get4SubArray(sortArr, 4);
    matrix = subarray.reduce((acc, item) => {
        return acc.concat(item);
    }, [] as IItemSquare[])
    return matrix.sort((a, b) => a.index - b.index);
}

export const moveUp = (matrix: IItemSquare[]) => {
    let sortArr = matrix.sort((a, b) => a.indexNum - b.indexNum);
    let subarray = get4SubArray(sortArr, 4);
    rotate(subarray)
    sortArr = moveHelp(subarray, false).sort((a, b) => a.indexNum - b.indexNum);

    subarray = get4SubArray(sortArr, 4);
    rotate(subarray)
    rotate(subarray)
    rotate(subarray)
    matrix = subarray.reduce((acc, item) => {
        return acc.concat(item);
    }, [] as IItemSquare[])
    return matrix.sort((a, b) => a.index - b.index);
}