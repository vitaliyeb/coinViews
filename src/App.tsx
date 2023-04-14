import React, {useEffect, useState} from 'react';
import Grid from "./components/Grid";
import ActionPanel from "./components/ActionPanel";

function App() {
    const [currency, setCurrency] = useState<string[]>(new URL(window.location.href).searchParams.get('c')?.split(',') || []);

    const [grid, setGrid] = useState((([columns = 4, rows = 4]) => ({rows: +rows, columns: +columns}))(new URL(window.location.href).searchParams.get('grid')?.split(':') || []));

    const intervalQuery = new URL(window.location.href)?.searchParams?.get('interval');
    const availableInterval = ["1", "3", "5", "15", "30", "60", "120", "180", "240", "D", "W"];

    const [interval, setInternal] = useState<any>(availableInterval.includes(intervalQuery || '') ? intervalQuery : '15');

    const changeQueryParam = (key: string, value: string) => {
        const url = new URL(window.location.href);
        url.searchParams.delete(key);
        url.searchParams.append(key, value);
        window.history.pushState(null, '', decodeURIComponent(url.toString()));

        key === 'c' && setCurrency(url.searchParams.get('c')?.split(',') || []);
    }

    useEffect(() => changeQueryParam('grid', `${grid.columns}:${grid.rows}`), [grid])
    useEffect(() => {
        changeQueryParam('interval', interval || '15');
    }, [interval]);

    useEffect(() => {
        !currency.length && changeQueryParam('c', 'USDRUB,BINANCE:BTCUSDT,BINANCE:ETHUSDT,BINANCE:MATICUSDT,BINANCE:LUNAUSDT,BINANCE:ANCUSDT,BINANCE:GLMRUSDT,BINANCE:DOGEUSDT,BINANCE:MANAUSDT,BINANCE:BNBUSDT,HUOBI:AURORAUSDT,BINANCE:ILVUSDT,AAPL,FB,MARA,PYPL')
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
                setCurrency={setCurrency}
            />
        </div>
    );
}

export default App;
