import React from 'react'
import ReactECharts from 'echarts-for-react'
import './home.less'

export default function Line() {
  
  const getOption = () => {
    return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
          right: "10%",
          textStyle:{
            color:'#4c9bfd'
          }
        },
          // 设置网格样式
          grid: { 
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true,// 显示边框
            borderColor: '#012f4a',// 边框颜色
            containLabel: true // 包含刻度文字在内
          },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick:{
            show: false,
          },
          axisLabel:{
            color:'#4c9bfd',
          },
          axisLine:{
            show: false
          },
      
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show: false,
          },
          axisLabel:{
            color:'#4c9bfd',
          },
          splitLine:{
            show: false
          }
        },
        color: ['#00f2f1', '#ed3f35'],
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data:  [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            smooth:true
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],  
            smooth:true
          },
      
      
        ]
      };
  }
  return (
    <div className='home-line'>
        <ReactECharts option={getOption()}/>
    </div>
  )
}
