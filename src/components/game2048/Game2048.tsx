import React, {useEffect, useState} from 'react';
import SquareItem from "./SquareItem";
import {ArrowEnum} from "../../type/ArrowEnum";
import {Input} from 'antd'
import {IItemSquare} from "../../type/IItemSquare";
import {moveDown, moveLeft, moveRight, moveUp} from "../../util/arrayTools";
import {Button} from 'antd';


const Game2048 = () => {
    const matrixDef: IItemSquare[] = [
        {index: 0, indexNum: 0, val: 0},
        {index: 1, indexNum: 1, val: 0},
        {index: 2, indexNum: 2, val: 0},
        {index: 3, indexNum: 3, val: 0},
        {index: 4, indexNum: 4, val: 0},
        {index: 5, indexNum: 5, val: 0},
        {index: 6, indexNum: 6, val: 0},
        {index: 7, indexNum: 7, val: 0},
        {index: 8, indexNum: 8, val: 0},
        {index: 9, indexNum: 9, val: 0},
        {index: 10,indexNum: 10, val: 0},
        {index: 11,indexNum: 11, val: 0},
        {index: 12,indexNum: 12, val: 0},
        {index: 13,indexNum: 13, val: 0},
        {index: 14,indexNum: 14, val: 0},
        {index: 15,indexNum: 15, val: 0}
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

            actionStep(event.code);

            setTimeout(()=>{setStepCount(stepCount + 1)},300);
        }
    }

    const actionStep = (action: ArrowEnum) => {

        if (action === ArrowEnum.ArrowLeft) {
            setMatrix(moveLeft(matrix));
        } else if (action == ArrowEnum.ArrowRight) {
            setMatrix(moveRight(matrix));
        } else if (action == ArrowEnum.ArrowDown) {
            setMatrix(moveDown(matrix));

        } else if (action == ArrowEnum.ArrowUp) {

            setMatrix(moveUp(matrix))

        }

    }

    function getRandomInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const generateSquare = () => {
        const squareVariant = [2,2,4,2];
        const squareVal = squareVariant[Math.floor(Math.random() * squareVariant.length)];
        let tempIndex: number;
        do {
            tempIndex = getRandomInRange(0, 15)
        } while (!(matrix.find((item) => item.index === tempIndex)?.val === 0))

        setMatrix(matrix.map(o => {
            if (o.index == tempIndex) {
                o.val = squareVal;
                return o;
            }
            return o;
        }));

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
                    {matrix.map((row) => {
                        return <SquareItem key={row.index}  square={row}/>
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