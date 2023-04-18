import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets";
import React, {useRef} from "react";
import {AdvancedRealTimeChartProps} from "react-ts-tradingview-widgets/dist/components/AdvancedRealTimeChart";
import styles from './styles.module.scss';
import DNDIcon from "./DNDIcon.svg";
import {TGrid} from "../../App";
import {changeQueryParam} from "../../utils/changeQueryParam";

const computedGridPosition = ({rows, columns}: TGrid, index: number) => {
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
    grid: TGrid,
    index: number
}> = ({
          symbol,
          interval,
          grid,
          index
      }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const getIndex = (el: Element | ChildNode) => {
        const {gridColumnStart, gridRowStart} = getComputedStyle(el as HTMLDivElement);
        return (parseInt(gridRowStart) - 1) * grid.columns + (parseInt(gridColumnStart) - 1);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const chartsWrapperEl = document.getElementById('chartsWrapper');
        chartsWrapperEl!.setAttribute('draggable', '');
        setTimeout(() => wrapperRef.current!.setAttribute('draggable', ''), 0)
        const el = e.currentTarget;
        el.style.zIndex = '15';
        el.style.position = 'fixed';
        const {width, height} = el.parentElement!.getBoundingClientRect();
        el.style.width = width + 'px';
        el.style.height = height + 'px';
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const chartsWrapperEl = document.getElementById('chartsWrapper');
        chartsWrapperEl!.removeAttribute('draggable');
        wrapperRef.current!.removeAttribute('draggable');
        const el = e.currentTarget;
        el.style.zIndex = 'auto';
        el.style.position = 'absolute';
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.top = 'auto';
        el.style.left = 'auto';
        wrapperRef.current!.style.pointerEvents = 'all';

        changeQueryParam('c', Array.from(document.getElementById('chartsWrapper')!.childNodes)
            .sort((a, b) => getIndex(a) - getIndex(b))
            .map(el => (el as HTMLDivElement).getAttribute('data-symbol'))
            .join(','))
    }

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {

        const el = e.currentTarget;
        const topOffset = 60;
        const leftOffset = 0;

        el.style.left = e.clientX - leftOffset + 'px';
        el.style.top = e.clientY - topOffset + 'px';
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        const chartsWrapperEl = document.getElementById('chartsWrapper');

        const draggableEl = chartsWrapperEl!.querySelector('[draggable]') as HTMLDivElement;
        const currentEl = e.currentTarget;
        if ((currentEl === draggableEl) || !draggableEl) return;

        const draggableElArea = getComputedStyle(draggableEl).gridArea;

        draggableEl.style.gridArea = getComputedStyle(currentEl).gridArea;
        currentEl.style.gridArea = draggableElArea;
    }


    return (<div
        style={{gridArea: computedGridPosition(grid, index).toString()}}
        className={styles.wrapper}
        ref={wrapperRef}
        data-symbol={symbol}
        onDragEnter={handleDragEnter}
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