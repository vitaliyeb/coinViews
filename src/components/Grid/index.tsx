import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './style.module.css';
import {AdvancedRealTimeChartProps} from "react-ts-tradingview-widgets/dist/components/AdvancedRealTimeChart";
import ChartWrapper from '../ChartWrapper';

const Grid: React.FC<{
    currency: string[],
    setCurrency: (charts: string[]) => void,
    grid: { columns: number, rows: number },
    interval: AdvancedRealTimeChartProps["interval"]
}> = ({interval, currency, grid, setCurrency}) => {
    const draggedStartIdx = useRef(0);
    const [isDragged, setIsDragged] = useState(false);

    const onDragStart = (index: number) => {
        draggedStartIdx.current = index;

        //todo if you need a ghost?
        /*const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.left = '-1000px';

        const {clientWidth, clientHeight} = event.currentTarget;
        canvas.width = clientWidth;
        canvas.height = clientHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = 'red';
        ctx.fillRect(0,0, clientWidth, clientHeight);

        document.body.appendChild(canvas);
        event.dataTransfer.setDragImage(canvas, 0 ,0);*/
    };

    const onDrop = (event: React.DragEvent, index: number) => {
        event.preventDefault();

        let charts = [...currency];
        [charts[draggedStartIdx.current], charts[index]] = [charts[index], charts[draggedStartIdx.current]];

        const url = new URL(window.location.href);
        url.searchParams.delete('c');
        url.searchParams.append('c', charts.join(','));
        window.history.pushState(null, '', decodeURIComponent(url.toString()));

        setCurrency(charts);
    };

    useEffect(()=> {
        console.log(isDragged);
    }, [isDragged])

    return (
        <div
            className={styles.wrapper}
            draggable={true}
            style={{
                gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
                gridTemplateRows: `repeat(${grid.rows}, 1fr)`
            }}
        >
            {
                currency.map((symbol, key) => (<ChartWrapper interval={interval} symbol={symbol} onDragStart={() => onDragStart(key)} onDrop={(e) => onDrop(e, key)} key={symbol}/>))
            }
        </div>
    );
};

export default Grid;
