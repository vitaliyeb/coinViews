import React, {useState} from "react";
import styles from './style.module.css';
import {AdvancedRealTimeChartProps} from "react-ts-tradingview-widgets/dist/components/AdvancedRealTimeChart";

const ChangeAxis: React.FC<{ title: string, value: number, change: any }> = ({title, value, change}) =>
    (<div className={styles.item}>
        <label htmlFor="">{title}</label>
        <input type='number' onInput={change} value={value} min={1} max={20}/>
    </div>);


const ActionPanel: React.FC<{
    setGrid: any;
    grid: { columns: number, rows: number };
    interval: AdvancedRealTimeChartProps["interval"];
    setInternal: any;
}> = ({setGrid, grid, interval, setInternal}) => {
    const changeAxis = (key: keyof typeof grid) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setGrid({...grid, [key]: +e.target.value});
    };
    const times = [{title: '1 min', value: '1'}, {title: '3 min', value: '3'}, {title: '15 min', value: '15'}, {title: '1h', value: '60'}, {title: '1d', value: 'D'}];

    return (<div className={styles.wrapper}>
        <ChangeAxis title={'Columns'} value={grid.columns} change={changeAxis('columns')}/>
        <ChangeAxis title={'Rows'} value={grid.rows} change={changeAxis('rows')}/>
        <select value={interval} onChange={e => setInternal(e.target.value)}>
            {
                times.map(({title, value}) => <option value={value} key={value}>{title}</option>)
            }
        </select>
    </div>)
}

export default ActionPanel;
