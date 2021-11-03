import React, {useEffect, useState} from 'react';
import SquareItem from "./SquareItem";
import {ArrowEnum} from "../../type/ArrowEnum";
import {Input} from 'antd'
import internal from "stream";


interface ItemSquare {
    x: number;
    y: number;
    val: number;
}

const Game2048 = () => {
    const matrixDef: ItemSquare[][] = [
        [{x: 0, y: 0, val: 0}, {x: 1, y: 0, val: 0}, {x: 2, y: 0, val: 0}, {x: 3, y: 0, val: 0}],
        [{x: 0, y: 1, val: 2}, {x: 1, y: 1, val: 2}, {x: 2, y: 1, val: 0}, {x: 3, y: 1, val: 0}],
        [{x: 0, y: 2, val: 0}, {x: 1, y: 2, val: 0}, {x: 2, y: 2, val: 0}, {x: 3, y: 2, val: 0}],
        [{x: 0, y: 3, val: 0}, {x: 1, y: 3, val: 0}, {x: 2, y: 3, val: 0}, {x: 3, y: 3, val: 0}],
    ];
    const [matrix, setMatrix] = useState(matrixDef);
    const [point, setPoint] = useState<number>(0);
    const inputEl = React.useRef(null);

    function handleKeyPress(event: React.KeyboardEvent): any {
        if (event.code === ArrowEnum.ArrowUp
            || event.code === ArrowEnum.ArrowRight
            || event.code === ArrowEnum.ArrowDown
            || event.code === ArrowEnum.ArrowLeft
        ) {
            setPoint(point + 1);
            actionStep(event.code);
        }
    }

    const actionStep = (action: ArrowEnum) => {

        if (action === ArrowEnum.ArrowLeft) {

            setMatrix(matrix.map((row) => {
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
                        sumTempArr.push(tempArr[i] + tempArr[i + 1])
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
            }));
        }
        if (action == ArrowEnum.ArrowRight) {

            setMatrix(matrix.map((row) => {
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
            }));
        }
    }

    function getRandomInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const generateSquare = () => {
        //определим кол-во оставшихся пустых клеток
        let emptySquareCount: number = 0;
        matrix.forEach(row => row.map(col => {
            if (col.val < 1) {
                emptySquareCount++;
            }
        }))
        if (emptySquareCount < 1) {
            alert('Game over');
            window.location.reload();
        }

        const squareVariant = [2, 2, 2, 4];
        const squareVal = squareVariant[Math.floor(Math.random() * squareVariant.length)];
        let point: ItemSquare = {x: 0, y: 0, val: 0};
        do {
            point.x = getRandomInRange(0, 3);
            point.y = getRandomInRange(0, 3);
        } while (!(matrix[point.x][point.y].val == 0))
        matrix[point.x][point.y].val = squareVal;
        setMatrix([...matrix]);
    }
    useEffect(() => {
        generateSquare();
    }, [point]);
    return (
        <div className={"container"}>
            <Input id={"InputTool"} ref={inputEl} autoFocus onKeyUp={handleKeyPress} type={"text"}/>
            <div className={"matrix"}>
                {matrix.map((row, index) => {
                    return row.map((col, index2) => {
                            return <SquareItem key={`${index}${index2}`} col={col}/>
                        }
                    )
                })}
            </div>
        </div>

    );
};

export default Game2048;