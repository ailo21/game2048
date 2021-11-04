import {ItemSquare} from "../type/ItemSquare";

// export const rotate = (matrix: ItemSquare[][]) => {
//     const n = matrix.length;
//     const x = Math.floor(n / 2);
//     const y = n - 1;
//     for (let i = 0; i < x; i++) {
//         for (let j = i; j < y - i; j++) {
//             const k = matrix[i][j];
//             matrix[i][j] = matrix[y - j][i];
//             matrix[y - j][i] = matrix[y - i][y - j];
//             matrix[y - i][y - j] = matrix[j][y - i]
//             matrix[j][y - i] = k
//         }
//     }
//     return matrix;
// }
export const moveLeft = (matrix: ItemSquare[]) => {
    let size = 4;
    let subarray = []; //массив в который будет выведен результат.
    for (let i = 0; i < Math.ceil(matrix.length / size); i++) {
        subarray[i] = matrix.slice((i * size), (i * size) + size);
    }

    let newArray = [] as ItemSquare[];
    subarray.forEach(s => {
        const startArray: ItemSquare[] = [];
        const endArray: ItemSquare[] = [];
        s.forEach((square) => {
            if (square.val > 0) {
                startArray.push(square);
            } else {
                endArray.push(square);
            }
        })
        newArray=newArray.concat(startArray.concat(endArray))
    })
    return newArray;
}
export const moveRight = (matrix: ItemSquare[]) => {
    let size = 4;
    let subarray = []; //массив в который будет выведен результат.
    for (let i = 0; i < Math.ceil(matrix.length / size); i++) {
        subarray[i] = matrix.slice((i * size), (i * size) + size);
    }

    let newArray = [] as ItemSquare[];
    subarray.forEach(s => {
        const startArray: ItemSquare[] = [];
        const endArray: ItemSquare[] = [];
        s.forEach((square) => {
            if (square.val > 0) {
                endArray.push(square);
            } else {
                startArray.push(square);
            }
        })
        newArray=newArray.concat(startArray.concat(endArray))
    })
    return newArray;
}
