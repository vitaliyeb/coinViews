import React from 'react';
import styles from './style.module.css';
import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets";

const ChartWrapper: React.FC<{ symbol: string}> = React.memo(({symbol}) => <AdvancedRealTimeChart
    interval={'15'}
    theme="dark"
    symbol={symbol}
    autosize
    hide_legend
    hide_side_toolbar
    withdateranges={false}
/>)

const Grid:React.FC<{
    currency: string[],
    grid: { columns: number, rows: number }
}> = ({ currency, grid }) => {
    return (
        <div
            className={styles.wrapper}
            style={{
                gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
                gridTemplateRows: `repeat(${grid.rows}, 1fr)`
            }}
        >
            {
                currency.map((symbol, key) => (<ChartWrapper symbol={symbol} key={key}/>))
            }
        </div>
    );
};

export default Grid;
