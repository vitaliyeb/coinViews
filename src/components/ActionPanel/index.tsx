import React, {useState} from "react";
import styles from './style.module.css';

const ChangeAxis: React.FC<{ title: string, value: number, change: any }> = ({title, value, change}) =>
    (<div className={styles.item}>
        <label htmlFor="">{title}</label>
        <input type='number' onInput={change} value={value} min={1} max={20}/>
    </div>);


const ActionPanel: React.FC<{
    setGrid: any;
    grid: { columns: number, rows: number }
}> = ({setGrid, grid}) => {
    const changeAxis = (key: keyof typeof grid) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setGrid({...grid, [key]: +e.target.value});
    };

    return (<div className={styles.wrapper}>
        <ChangeAxis title={'Columns'} value={grid.columns} change={changeAxis('columns')}/>
        <ChangeAxis title={'Rows'} value={grid.rows} change={changeAxis('rows')}/>
    </div>)
}

export default ActionPanel;
