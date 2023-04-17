import React, {useEffect, useState} from 'react';
import Grid from "./components/Grid";
import ActionPanel from "./components/ActionPanel";
import {changeQueryParam} from "./utils/changeQueryParam";

export type TGrid = {
    columns: number;
    rows: number;
}

function App() {
    const [currency, setCurrency] = useState<string[]>(new URL(window.location.href).searchParams.get('c')?.split(',') || []);

    const [grid, setGrid] = useState<TGrid>((([columns = 4, rows = 4]) => ({
        rows: +rows,
        columns: +columns
    }))(new URL(window.location.href).searchParams.get('grid')?.split(':') || []));

    const intervalQuery = new URL(window.location.href)?.searchParams?.get('interval');
    const availableInterval = ["1", "3", "5", "15", "30", "60", "120", "180", "240", "D", "W"];

    const [interval, setInternal] = useState<any>(availableInterval.includes(intervalQuery || '') ? intervalQuery : '15');


    const changeParams = (key: string, value: string) => {
        const url = changeQueryParam(key, value);
        key === 'c' && setCurrency(url.searchParams.get('c')?.split(',') || []);
    }

    useEffect(() => changeParams('grid', `${grid.columns}:${grid.rows}`), [grid])
    useEffect(() => {
        changeParams('interval', interval || '15');
    }, [interval]);

    useEffect(() => {
        !currency.length && changeParams('c', 'USDRUB,BINANCE:BTCUSDT,BINANCE:ETHUSDT,BINANCE:MATICUSDT,BINANCE:LUNAUSDT,BINANCE:ANCUSDT,BINANCE:GLMRUSDT,BINANCE:DOGEUSDT,BINANCE:MANAUSDT,BINANCE:BNBUSDT,HUOBI:AURORAUSDT,BINANCE:ILVUSDT,AAPL,FB,MARA,PYPL')
    }, []);

    return (
        <div className="App">
            <ActionPanel
                grid={grid}
                setGrid={setGrid}
                interval={interval}
                setInternal={setInternal}
            />
            <Grid
                interval={interval}
                grid={grid}
                currency={currency}
            />
        </div>
    );
}

export default App;
