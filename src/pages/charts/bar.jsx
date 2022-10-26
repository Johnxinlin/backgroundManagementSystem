import React, { useState } from 'react'
import { Card, Button } from 'antd'
import ReactECharts from 'echarts-for-react';


export default function Bar() {
  const [sales,setSales] = useState([5, 20, 36, 10, 10, 20])
  const [stores,setStores] = useState([6, 10, 25, 20, 15, 10])

  const getOption = (sales, stores) => {
    return {
      tooltip: {},
      legend: {
        data:['销量', '库存']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: sales
      }, {
        name: '库存',
        type: 'bar',
        data: stores
      }]
    }
  }

  const update = () => {
    const newSales = sales.map(item => item + 1)
    const newStores = stores.reduce((pre, item) => {
      pre.push(item - 1)
      return pre
    }, [])
    setSales(newSales)
    setStores(newStores)
  }

  return (
    <div>
        <Card>
          <Button type='primary' onClick={update}>更新</Button>
        </Card>

        <Card title='柱状图一'>
          <ReactECharts option={getOption(sales, stores)} /> 
        </Card>

      </div>
  )
}
