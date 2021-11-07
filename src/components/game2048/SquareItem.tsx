import React, {FC} from 'react';
import {IItemSquare} from "../../type/IItemSquare";

interface OperationBtnProps {
    square: IItemSquare
}

interface coordinate {
    y: number,
    x: number
}

const defineSpec = (num: number): coordinate => {
    let coordinate = {} as coordinate;
    switch (num) {
        case 0:
            coordinate = {y: 0, x: 0};
            break;
        case 1:
            coordinate = {y: 0, x: 25};
            break;
        case 2:
            coordinate = {y: 0, x: 50};
            break;
        case 3:
            coordinate = {y: 0, x: 75};
            break;

        case 4:
            coordinate = {y: 25, x: 0};
            break;
        case 5:
            coordinate = {y: 25, x: 25};
            break;
        case 6:
            coordinate = {y: 25, x: 50};
            break;
        case 7:
            coordinate = {y: 25, x: 75};
            break;

        case 8:
            coordinate = {y: 50, x: 0};
            break;
        case 9:
            coordinate = {y: 50, x: 25};
            break;
        case 10:
            coordinate = {y: 50, x: 50};
            break;
        case 11:
            coordinate = {y: 50, x: 75};
            break;

        case 12:
            coordinate = {y: 75, x: 0};
            break;
        case 13:
            coordinate = {y: 75, x: 25};
            break;
        case 14:
            coordinate = {y: 75, x: 50};
            break;
        case 15:
            coordinate = {y: 75, x: 75};
            break;

        default:
            break;
    }
    return coordinate;
}

const SquareItem: FC<OperationBtnProps> = ({square}) => {

    const coordinate:coordinate = defineSpec(square.indexNum)

    return <div
        className={`matrix_item matrix_item__${square.val}${square.val<1?" matrix_opacity":""}`}
        style={{left: `${coordinate.x}%`, top: `${coordinate.y}%`}}
    >
        <span>{square.val}</span>
        {/*<span>{square.val > 0 ? square.val : square.index}</span>*/}
    </div>
};

export default SquareItem;