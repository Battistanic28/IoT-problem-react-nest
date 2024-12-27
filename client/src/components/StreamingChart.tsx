import React from "react";
import { Box } from "@mui/material";
import EChartsReact from "echarts-for-react";

type DataPoint = {
    id: string,
    number: number;
    timestamp: string;
}

type ChartProps = {
    data: DataPoint[]
}

const StreamingDataChart = ({data}: ChartProps) => {
    console.log(data)

    const option = {
        xAxis: {
          type: "category",
          data: data.map((point) => point.timestamp),
          axisLabel: {
            rotate: 45,
            textStyle: {
              color: '#FFFFFF'
          }
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data.map((point) => point.number),
            type: "line",
            smooth: true,
          },
        ],
        tooltip: {
          trigger: "axis",
        },
        title: {
          text: "Streaming Data Chart",
          textStyle: {
            color: '#FFFFFF'
            }
        },
      };

    return (
      <Box sx={{width: "80%", margin: '1rem'}}>
        {data.length ?
          <EChartsReact option={option} style={{ height: "400px", width: "100%" }} /> :
          <p>Connect to start collecting data</p>
        }
      </Box>
    )
}

export default StreamingDataChart;