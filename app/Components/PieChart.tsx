import React from 'react';
import { View, Text } from "react-native";
import styles from '../Utils/Styles';
import Svg, { G, Circle } from "react-native-svg";
import { numberToCurrency, CurrencyCode } from '../Utils/Convert';

type PieChartSegmentData = {
    amount: number
}

type PieChartProps = {
    segmentData: Array<PieChartSegmentData>,
    radius: number,
    title: string
};

const PieChart = ({ segmentData, radius, title }: PieChartProps) => {
    const currencyCode = CurrencyCode.GDP;
    const circleCircumference = 2 * Math.PI * radius;

    var absTotal = 0;
    var total = 0;
    for (var i = 0; i < segmentData.length; i++) {
        var value = segmentData[i].amount;
        var absValue = Math.abs(value);
        absTotal += value;
        total += value;
    }

    var segments = []
    var prevAngle = 0;
    var prevH = 0;
    for (var i = 0; i < segmentData.length; i++) {
        var value = segmentData[i].amount;
        if (value == 0){
            continue;
        }
        var absValue = Math.abs(value);
        var percentage = (absValue / absTotal) * 100;
        var strokeDashoffset = circleCircumference - (circleCircumference * percentage) / 100;
        var h = 0;
        var s = 50;
        var l = 50;
        if (value < 0){
            // mark negative values as red
            h = 0;
            s = 75;
        } else {
            // make sure the next colour isn't similar to the colour before
            var h_diff = 0;
            var h = 0;
            while(h_diff <= 20 || h < 20 || h > 360 - 20){
                h = 1 + Math.random() * (360 - 1);
                h_diff = Math.abs(h - prevH);
            }
        }
        var colour = 'hsl(' + h + ',' + s + '%,' + l + '%)';
        segments.push(
            {
                color: colour,
                strokeDashoffset: strokeDashoffset,
                angle: prevAngle,
            }
        )
        prevH = h;
        prevAngle = prevAngle + (value / absTotal) * 360;
    }

    var segmentCircles = segments.map((segment, index) => {
        const key = index;
        return (
            <Circle
                key={key}
                cx="50%"
                cy="50%"
                r={radius}
                stroke={segment.color}
                fill="transparent"
                strokeWidth="35"
                strokeDasharray={circleCircumference}
                strokeDashoffset={segment.strokeDashoffset}
                rotation={segment.angle}
                originX="90"
                originY="90"
                strokeLinecap="butt"
            />
        )
    });

    return (
        <View style={styles.cardContent}>
            <Text style={styles.baseText}>{title}</Text>
            <View style={styles.cardContent}>
                <Svg height="160" width="160" viewBox="0 0 180 180">
                    <G rotation={-90} originX="90" originY="90">
                        {absTotal === 0 ? (
                            <Circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="#F1F6F9"
                                fill="transparent"
                                strokeWidth="40"
                            />
                        ) : (
                            <> {segmentCircles} </>
                        )
                        }
                    </G>
                </Svg>
                <Text style={styles.pieChartLabel}>
                    {numberToCurrency(total, currencyCode)}
                </Text>
            </View>
        </View>
    )
};

export default PieChart;
export { PieChartSegmentData };
