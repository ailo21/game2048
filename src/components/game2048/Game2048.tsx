import React, {useEffect, useState} from 'react';
import SquareItem from "./SquareItem";
import {ArrowEnum} from "../../type/ArrowEnum";
import {Input} from 'antd'
import {ItemSquare} from "../../type/ItemSquare";
import {moveLeft, moveRight, rotate} from "../../util/arrayTools";
import { Button } from 'antd';


const Game2048 = () => {
    const matrixDef: ItemSquare[][] = [
        [{x: 0, y: 0, val: 0}, {x: 1, y: 0, val: 0}, {x: 2, y: 0, val: 0}, {x: 3, y: 0, val: 0}],
        [{x: 0, y: 1, val: 0}, {x: 1, y: 1, val: 0}, {x: 2, y: 1, val: 0}, {x: 3, y: 1, val: 0}],
        [{x: 0, y: 2, val: 0}, {x: 1, y: 2, val: 0}, {x: 2, y: 2, val: 0}, {x: 3, y: 2, val: 0}],
        [{x: 0, y: 3, val: 0}, {x: 1, y: 3, val: 0}, {x: 2, y: 3, val: 0}, {x: 3, y: 3, val: 0}],
    ];
    const [matrix, setMatrix] = useState(matrixDef);
    const [stepCount, setStepCount] = useState<number>(0);
    const inputEl = React.useRef(null);

    function handleKeyPress(event: React.KeyboardEvent): any {
        if (event.code === ArrowEnum.ArrowUp
            || event.code === ArrowEnum.ArrowRight
            || event.code === ArrowEnum.ArrowDown
            || event.code === ArrowEnum.ArrowLeft
        ) {
            setStepCount(stepCount + 1);
            actionStep(event.code);
        }
    }

    const actionStep = (action: ArrowEnum) => {

        if (action === ArrowEnum.ArrowLeft) {
            setMatrix(moveLeft(matrix));
        } else if (action == ArrowEnum.ArrowRight) {

            setMatrix(moveRight(matrix));
        } else if (action == ArrowEnum.ArrowDown) {
            rotate(matrix);

            let newArray =moveLeft(matrix);

            rotate(newArray);
            rotate(newArray);
            rotate(newArray);
            setMatrix(newArray)

        } else if (action == ArrowEnum.ArrowUp) {

            rotate(matrix);

            let newArray =moveRight(matrix);

            rotate(newArray);
            rotate(newArray);
            rotate(newArray);
            setMatrix(newArray)

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
            setMatrix(matrixDef);
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

    const newGame = () => {
        setMatrix(matrixDef);
        setStepCount(1);

    }

    useEffect(() => {
        generateSquare();
    }, []);
    useEffect(() => {
        generateSquare();
    }, [stepCount]);

    return (
        <div className={"container"}>
            <Input id={"InputTool"} ref={inputEl} autoFocus onKeyUp={handleKeyPress} type={"text"}/>
            <div className={"matrix_wrap"}>
                <div className={"matrix"}>
                    {matrix.map((row, index) => {
                        return row.map((col, index2) => {
                                return <SquareItem key={`${index}${index2}`} col={col}/>
                            }
                        )
                    })}
                </div>
                <div className={"matrix_tools"}>
                    <Button block onClick={newGame}>
                        Новая игра
                    </Button>
                </div>
            </div>


        </div>

    );
};

export default Game2048;