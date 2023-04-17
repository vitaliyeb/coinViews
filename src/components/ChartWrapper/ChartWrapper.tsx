import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets";
import React, {useRef} from "react";
import {AdvancedRealTimeChartProps} from "react-ts-tradingview-widgets/dist/components/AdvancedRealTimeChart";
import styles from './styles.module.scss';
import DNDIcon from "./DNDIcon.svg";
import {Grid} from "../../App";

const computedGridPosition = ({rows, columns}: Grid, index: number) => {
    const row = Math.ceil(index / columns);
    const column = (index % columns) || columns;
    return {
        row,
        column,
        toString: () => `${row} / ${column} / ${row} / ${column}`
    }
}

const ChartWrapper: React.FC<{
    symbol: string,
    interval: AdvancedRealTimeChartProps["interval"],
    grid: Grid,
    index: number
}> = ({
          symbol,
          interval,
          grid,
          index
      }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        wrapperRef.current!.setAttribute('draggable', '');
        const el = e.currentTarget;
        (wrapperRef.current as HTMLDivElement).style.background = 'green !important';
        el.style.zIndex = '15';
        el.style.position = 'fixed';
        const {width, height} = el.parentElement!.getBoundingClientRect();
        el.style.width = width + 'px';
        el.style.height = height + 'px';
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        wrapperRef.current!.removeAttribute('draggable');
        const el = e.currentTarget;
        el.style.zIndex = 'auto';
        el.style.position = 'absolute';
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.top = 'auto';
        el.style.left = 'auto';
        wrapperRef.current!.style.pointerEvents = 'all';
    }

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        wrapperRef.current!.style.pointerEvents = 'none';
        const el = e.currentTarget;
        const topOffset = 60;
        const leftOffset = 0;

        el.style.left = e.clientX - leftOffset + 'px';
        el.style.top = e.clientY - topOffset + 'px';
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        const chartsWrapperEl = document.getElementById('chartsWrapper');
        const charts = Array.from(chartsWrapperEl!.childNodes);
        const draggableEl = chartsWrapperEl!.querySelector('[draggable]');
        const currentEl = e.currentTarget;

        if (currentEl === draggableEl) return;

        const draggableElIdx = charts.findIndex(el => el === draggableEl);
        const currentElIdx = charts.findIndex(el => el === currentEl);

        const newPosition = getComputedStyle(currentEl).gridArea;

        if (draggableElIdx < currentElIdx) {
            charts.slice(draggableElIdx + 1, currentElIdx + 1)
                .forEach((el, idx) =>
                    (el as HTMLElement).style.gridArea = computedGridPosition(grid, draggableElIdx + idx + 1).toString());

        } else {
            charts.slice(currentElIdx, draggableElIdx)
                .forEach((el, idx) =>
                    (el as HTMLElement).style.gridArea = computedGridPosition(grid, currentElIdx + idx + 2).toString());
        }

        (draggableEl as HTMLDivElement).style.gridArea = newPosition;
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {

    }


    return (<div
        style={{gridArea: computedGridPosition(grid, index).toString()}}
        className={styles.wrapper}
        ref={wrapperRef}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}

    >
        <div
            className={styles.dndWrapper}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
        >
            <img className={styles.dndIcon} src={DNDIcon}/>
            <AdvancedRealTimeChart
                key="chart"
                interval={interval}
                theme="dark"
                symbol={symbol}
                autosize
                hide_legend
                hide_side_toolbar
                withdateranges={false}
            />
        </div>
    </div>)

}

export default ChartWrapper;