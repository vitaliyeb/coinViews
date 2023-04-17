import React from 'react';
import styles from './style.module.scss';
import {AdvancedRealTimeChartProps} from "react-ts-tradingview-widgets/dist/components/AdvancedRealTimeChart";
import ChartWrapper from "../ChartWrapper/ChartWrapper";


const Grid:React.FC<{
    currency: string[],
    grid: { columns: number, rows: number },
    interval: AdvancedRealTimeChartProps["interval"]
}> = ({ interval, currency, grid }) => {



    return (
        <div
            id="chartsWrapper"
            className={styles.wrapper}
            style={{
                gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
                gridTemplateRows: `repeat(${grid.rows}, 1fr)`
            }}
        >
            {
                currency.map((symbol, idx) => (<ChartWrapper
                    grid={grid}
                    index={idx + 1}
                    interval={interval}
                    symbol={symbol}
                    key={idx}
                />))
            }
        </div>
    );
};

export default Grid;
