import React, {FC} from 'react';
import {ItemSquare} from "../../type/ItemSquare";

interface OperationBtnProps {
    square: ItemSquare,
    num: number
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

const SquareItem: FC<OperationBtnProps> = ({square, num}) => {

    const coordinate:coordinate = defineSpec(num)
    if(square.val > 0){
        return <div
            className={`matrix_item matrix_item__${square.val}`}
            style={{left: `${coordinate.x}%`, top: `${coordinate.y}%,`,right:'0%'}}
        >
            <span>{square.val > 0 ? square.val : ''}</span>
        </div>
    }
    else return <div className={"matrix_empty"}></div>
};

export default SquareItem;