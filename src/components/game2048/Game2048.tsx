import React, {useEffect, useState} from 'react';
import SquareItem from "./SquareItem";
import {ArrowEnum} from "../../type/ArrowEnum";
import {Input} from 'antd'
import {ItemSquare} from "../../type/ItemSquare";
import {moveLeft,moveRight} from "../../util/arrayTools";
import {Button} from 'antd';


const Game2048 = () => {
    const matrixDef: ItemSquare[] = [
        {index: 0, val: 0},
        {index: 1, val: 0},
        {index: 2, val: 0},
        {index: 3, val: 0},
        {index: 4, val: 0},
        {index: 5, val: 0},
        {index: 6, val: 0},
        {index: 7, val: 0},
        {index: 8, val: 0},
        {index: 9, val: 0},
        {index: 10, val: 0},
        {index: 11, val: 0},
        {index: 12, val: 0},
        {index: 13, val: 0},
        {index: 14, val: 0},
        {index: 15, val: 0}
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
            // rotate(matrix);
            //
            // let newArray =moveLeft(matrix);
            //
            // rotate(newArray);
            // rotate(newArray);
            // rotate(newArray);
            // setMatrix(newArray)

        } else if (action == ArrowEnum.ArrowUp) {

            // rotate(matrix);
            //
            // let newArray =moveRight(matrix);
            //
            // rotate(newArray);
            // rotate(newArray);
            // rotate(newArray);
            // setMatrix(newArray)

        }

    }

    function getRandomInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const generateSquare = () => {
        const squareVariant = [2, 2, 2, 4];
        const squareVal = squareVariant[Math.floor(Math.random() * squareVariant.length)];
        let tempIndex: number;
        do {
            tempIndex = getRandomInRange(0, 15)
        } while (!(matrix.find((item) => item.index === tempIndex)?.val === 0))

        setMatrix(matrix.map(o=>{
            if(o.index==tempIndex){
                o.val=squareVal;
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
    // useEffect(() => {
    //     generateSquare();
    // }, [stepCount]);

    return (
        <div className={"container"}>
            <Input id={"InputTool"} ref={inputEl} autoFocus onKeyUp={handleKeyPress} type={"text"}/>
            <div className={"matrix_wrap"}>
                <div className={"matrix"}>
                    {matrix.map((row, index) => {
                        return <SquareItem key={`${row.index}`} num={index} square={row}/>
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