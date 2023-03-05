import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import styles from '../Utils/Styles';
import Svg, { G, Circle } from "react-native-svg";
import { numberToCurrency, numberToString, CurrencyCode } from '../Utils/Tools';

type PieChartSegmentData = {
    name: string
    amount: number
}

interface Props {
    segmentData: Array<PieChartSegmentData>,
    redNegative: boolean,
    radius: number,
    title: string
};

const SpendingPieChart: React.FC<Props> = ({segmentData, radius, redNegative, title}) => {
    const [selectedSegment, setSelectedSegment] = useState(0);
    const currencyCode = CurrencyCode.GDP;
    const circleCircumference = 2 * Math.PI * radius;

    interface Segment{
        color: string,
        strokeDashoffset: number,
        angle: number,
        percentage: number,
        selected: boolean,
        amount: number,
        name: string
    }

    var absTotal = 0;
    var total = 0;
    for (var i = 0; i < segmentData.length; i++) {
        var value = segmentData[i].amount;
        var absValue = Math.abs(value);
        absTotal += absValue;
        total += value;
    }

    var segments: Array<Segment> = []
    var prevAngle = 0;
    var prevH = 0;
    var h_index = 0;
    var h_step = (360-10) / i;
    if (h_step < 10){
        h_step = 10;
    }
    for (var i = 0; i < segmentData.length; i++) {
        var value = segmentData[i].amount;
        var absValue = Math.abs(value);
        var percentage = (absValue / absTotal) * 100;
        var strokeDashoffset = circleCircumference - (circleCircumference * percentage) / 100;
        var h = 0;
        var s = 50;
        var l = 50;
        if (value < 0 && redNegative){
            // mark negative values as red
            h = 0;
            s = 75;
        } else {
            // // make sure the next colour isn't similar to the colour before
            // var h_diff = 0;
            // var h = 0;
            // while(h_diff <= 20 || h < 20 || h > 360 - 20){
            //     h = 1 + Math.random() * (360 - 1);
            //     h_diff = Math.abs(h - prevH);
            // }
            h = 10 + (h_index * h_step) * (360 - 10);
            if (h_index > 10){
                h_index = 0;
            }
            h_index++;
        }
        var colour = 'hsl(' + h + ',' + s + '%,' + l + '%)';
        segments.push(
            {
                color: colour,
                strokeDashoffset: strokeDashoffset,
                angle: prevAngle,
                percentage: percentage,
                selected: i == selectedSegment,
                amount: segmentData[i].amount,
                name: segmentData[i].name
            }
        )
        prevH = h;
        prevAngle = prevAngle + (absValue / absTotal) * 360;
    }

    var segmentButtons = segments.map((segment, index) => {
        const key = index;
        var height = 17;
        var width = 17;
        if (segment.selected){
            height += 2;
            width += 2;
        }
        return(
            <View key={key} style={styles.cardWheelButtonsContent}>
                <TouchableOpacity
                    style={{
                        height: height, width: width, backgroundColor: segment.color,
                        borderRadius: 2,
                    }}
                    onPress={() => setSelectedSegment(index)}><Text/>
                </TouchableOpacity>
            </View>
        )
    });

    var segmentCircles = segments.map((segment, index) => {
        var strokeWidth = 30;
        var radiusV = radius;
        var strokeDashoffset = segment.strokeDashoffset;
        var strokeDasharray = circleCircumference;
        if (segment.selected){
            radiusV = radius + 2.5;
            strokeDasharray = 2 * Math.PI * radiusV;
            strokeDashoffset = strokeDasharray - (strokeDasharray * segment.percentage) / 100;
            strokeWidth = strokeWidth + 5;
        }
        const key = index;
        return (
            <Circle
                key={key}
                cx="50%"
                cy="50%"
                r={radiusV}
                stroke={segment.color}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                rotation={segment.angle}
                originX={90}
                originY={90}
                strokeLinecap="butt"
            />
        )
    });

    var selectedSegmentDesc: string = numberToCurrency(
        segments[selectedSegment].amount, currencyCode);
    selectedSegmentDesc += " (" + numberToString(
        segments[selectedSegment].percentage, 2) + "%)";

    return (
        <View style={styles.cardWheelContent}>
            <Text style={styles.subHeadingText}>{title}</Text>
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
            <Text style={styles.pieChartDescLabel}>
                {segments[selectedSegment].name}
            </Text>
            <Text style={styles.pieChartDescLabel}>
                {selectedSegmentDesc}
            </Text>
            <View style={styles.cardWheelButtons}>
                {segmentButtons}
            </View>
        </View>
    )
};

export default SpendingPieChart;
export { PieChartSegmentData };
