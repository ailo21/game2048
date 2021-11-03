import React, {FC} from 'react';
import {ItemSquare} from "../../type/ItemSquare";
interface OperationBtnProps{
    col:ItemSquare
}

const SquareItem:FC<OperationBtnProps> = ({col}) => {
    return <div
        className={`matrix_item matrix_item__${col.val}`}
        style={{left: `${col.x * 25}%`, top: `${col.y * 25}%`}}
    >
        <span>{col.val>0?col.val:''}</span>
    </div>
};

export default SquareItem;