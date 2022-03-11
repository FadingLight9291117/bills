import * as echarts from "echarts"
import { Component } from 'react';
import api from '../api';

class MPie extends Component {
    async componentDidMount() {
        const chat = echarts.init(this.el, null, {
            width: this.props.width ? this.props.width : 600,
            height: this.props.height ? this.props.height : 400,
        });
        const year = this.props.year;
        const month = this.props.month;
        const data = await api.getData(year, month)


        // 统计
        const chartData = new Map()
        data.forEach((v, k) => {
            const cls = v['类型']
            const money = v['金额']
            chartData[cls] = chartData[cls] === undefined ? chartData[cls] += money : money
        })

        chartData.map((v, k) => {
            return {
                value: v,
                name: k
            }
        })

        const option = {
            series: [
                {
                    type: 'pie',
                    data: chartData
                }
            ]
        };
        chat.setOption(option);
    }

    render() {
        return (
            <div className='default-chart' ref={el => this.el = el}></div>
        )
    }

}

export default MPie;