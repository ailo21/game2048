import React from 'react';

const SquareItem = ({col}) => {
    return <div
        className={`matrix_item matrix_item__${col.val}`}
        style={{left: `${col.x * 25}%`, top: `${col.y * 25}%`}}
    >
        <span>{col.val}</span>
    </div>
};

export default SquareItem;