import React, {FC} from "react";
import {AdvancedRealTimeChartProps} from "react-ts-tradingview-widgets/dist/components/AdvancedRealTimeChart";
import classNames from "classnames";
import styles from "../ChartWrapper/style.module.css";
import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets";
import ControlCamera from "../../assets/images/сontrol-camera.svg";

interface Props {
    symbol: string,
    interval: AdvancedRealTimeChartProps["interval"],
    onDragStart: (e: React.DragEvent) => void,
    onDrop: (e: React.DragEvent) => void,
}

const ChartWrapper: React.FC<Props> = ({symbol, interval,onDragStart , onDrop}) => {
    return (
        <div className={classNames(styles.chartWrapper)}
             draggable="true"
             onDragStart={onDragStart}
             onDragOver={e => {
                 e.preventDefault()
             }}
             onDrop={onDrop}>
            <AdvancedRealTimeChart
                interval={interval}
                theme="dark"
                symbol={symbol}
                autosize
                hide_legend
                hide_side_toolbar
                withdateranges={false}
            />
            <img src={ControlCamera} className={styles.controlImg} alt="control camera"/></div>

    );
}

export default React.memo(ChartWrapper);

