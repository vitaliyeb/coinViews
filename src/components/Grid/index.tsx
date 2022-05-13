import React from 'react';
import styles from './style.module.css';
import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets";
import {AdvancedRealTimeChartProps} from "react-ts-tradingview-widgets/dist/components/AdvancedRealTimeChart";

const ChartWrapper: React.FC<{
    symbol: string,
    interval: AdvancedRealTimeChartProps["interval"]
}> = React.memo(({symbol, interval}) => <AdvancedRealTimeChart
    interval={interval}
    theme="dark"
    symbol={symbol}
    autosize
    hide_legend
    hide_side_toolbar
    withdateranges={false}
/>)

const Grid:React.FC<{
    currency: string[],
    grid: { columns: number, rows: number },
    interval: AdvancedRealTimeChartProps["interval"]
}> = ({ interval, currency, grid }) => {
    return (
        <div
            className={styles.wrapper}
            style={{
                gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
                gridTemplateRows: `repeat(${grid.rows}, 1fr)`
            }}
        >
            {
                currency.map((symbol, key) => (<ChartWrapper interval={interval} symbol={symbol} key={key}/>))
            }
        </div>
    );
};

export default Grid;
