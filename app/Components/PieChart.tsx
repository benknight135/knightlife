import React from 'react';
import { View, Text } from "react-native";
import styles from '../Utils/Styles';
import Svg, { G, Circle } from "react-native-svg";
import { NumberToCurrency, CurrencyCode } from '../Utils/Convert';

type PieChartProps = {
    values: Array<number>,
    radius: number
};

const PieChart = ({ values, radius }: PieChartProps) => {
    const currencyCode = CurrencyCode.GDP;
    const circleCircumference = 2 * Math.PI * radius;

    var total = 0;
    for (var i = 0; i < values.length; i++) {
        var value = Math.abs(values[i]);
        total += value;
    }

    var segments = []
    var prevAngle = 0;
    var prevH = 0;
    for (var i = 0; i < values.length; i++) {
        var value = Math.abs(values[i]);
        if (value == 0){
            continue;
        }
        var percentage = (value / total) * 100;
        var strokeDashoffset = circleCircumference - (circleCircumference * percentage) / 100;
        // make sure the next colour isn't similar to the colour before
        var h_diff = 0;
        var h = 0;
        while(h_diff <= 50){
            h = 1 + Math.random() * (360 - 1);
            h_diff = Math.abs(h - prevH);
        }
        var s = 50;
        var l = 50;
        var colour = 'hsl(' + h + ',' + s + '%,' + l + '%)';
        segments.push(
            {
                color: colour,
                strokeDashoffset: strokeDashoffset,
                angle: prevAngle,
            }
        )
        prevH = h;
        prevAngle = prevAngle + (value / total) * 360;
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
                strokeWidth="40"
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
        <View style={styles.pieChart}>
            <Svg height="160" width="160" viewBox="0 0 180 180">
                <G rotation={-90} originX="90" originY="90">
                    {total === 0 ? (
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
            <Text style={styles.pieChartLabel}>{NumberToCurrency(total, currencyCode)}</Text>
        </View>
    )
};

export default PieChart;


