import React, {useEffect, useState} from 'react';
import Grid from "./components/Grid";
import ActionPanel from "./components/ActionPanel";

function App() {
    const [currency, setCurrency] = useState<string[]>(new URL(window.location.href).searchParams.get('c')?.split(',') || []);
    const [grid, setGrid] = useState({rows: 4, columns: 4});

    const changeQueryParam = (key: string, value: string) => {
        const url = new URL(window.location.href);
        url.searchParams.delete(key);
        url.searchParams.append(key, value)
        window.history.pushState(null, '', decodeURIComponent(url.toString()))

        key === 'c' && setCurrency(url.searchParams.get('c')?.split(',') || []);
    }

    useEffect(() => changeQueryParam('grid', `${grid.columns}:${grid.rows}`), [grid])

    useEffect(() => {
        !currency.length && changeQueryParam('c', 'USDRUB,BINANCE:BTCUSDT,BINANCE:ETHUSDT,BINANCE:MATICUSDT,BINANCE:LUNAUSDT,BINANCE:ANCUSDT,BINANCE:GLMRUSDT,BINANCE:DOGEUSDT,BINANCE:MANAUSDT,BINANCE:BNBUSDT,HUOBI:AURORAUSDT,BINANCE:ILVUSDT,AAPL,FB,MARA,PYPL')
    }, []);

    return (
        <div className="App">
            <ActionPanel
                grid={grid}
                setGrid={setGrid}
            />
            <Grid
                grid={grid}
                currency={currency}
            />
        </div>
    );
}

export default App;
