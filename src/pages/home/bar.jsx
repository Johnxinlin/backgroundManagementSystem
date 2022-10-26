import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import './home.less'

export default function Bar() {
  const [data, setData] = useState([702, 350, 610, 793, 664])
  const [percentage, setPercentage] = useState([]) 
  
  useEffect(() => {
    const sum = getSum(data)
    setPercentage(data.map(item => {
        return (item / sum * 100).toFixed(2)
    }))
  }, [data])

  const getSum = (data) => {
    return data.reduce((pre, item) => {
        return pre + item
    }, 0)
  }
  const myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
  const getOption = (data) => {
    return {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        grid: {
            top: "10%",
            left: "10%",
            bottom: "10%",
            containLabel: false,
        },
        xAxis: {
            show: false,
        },
        yAxis: [
            {
                type: "category",
                data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: "#aaa",
                },
            },
            {
                show: true,
                data: data,
                inverse: true,
                // 不显示y轴的线
                axisLine: {
                    show: false,
                },
                // 不显示刻度
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: "#ccc",
                    },
                },
            },
        ],
        
        series: [
            {
                name: "条",
                type: "bar",
                data: percentage,
                barWidth: 10,
                barCategoryGap: 50,
                itemStyle: {
                    barBorderRadius: 20,
                    color: function (params) {
                        return myColor[params.dataIndex];
                    },
                },
                yAxisIndex: 0,
                label: {
                    show: true,
                    position: "inside",
                    formatter: "{c}%",
                },
            },
            {
                name: "框",
                type: "bar",
                data: [100, 100, 100, 100, 100],
                barWidth: 15,
                barCategoryGap: 50,
                itemStyle: {
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 3,
                    barBorderRadius: 15,
                },
                yAxisIndex: 1,
            },
        ],
    };
  }
  return (
    <div className='home-bar'>
        <ReactECharts option={getOption(data)}/>
    </div>
  )
}

