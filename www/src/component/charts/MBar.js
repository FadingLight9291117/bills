import * as echarts from "echarts"
import { Component } from 'react';

export default class MBar extends Component {
    async componentDidMount() {
        const chat = echarts.init(this.el, null, {
            width: this.props.width ? this.props.width : 800,
            height: this.props.height ? this.props.height : 300,
        });
        const year = this.props.year;
        const month = this.props.month;
        const data = this.props.data;


        // 统计
        const data_map = new Map()
        data.forEach((v, k) => {
            const dayOfMonth = new Date(v['date']).getDate()
            const money = v['money']
            const dayMoney = data_map.get(dayOfMonth) ? data_map.get(dayOfMonth) + money : money
            data_map.set(dayOfMonth, dayMoney)
        })

        const chartData = []
        data_map.forEach((v, k) => {
            chartData.push([k, v.toFixed(1)])
        })
        chartData.sort((x, y) => x[0] - y[0]);
        const chartDataX = chartData.map(x => `${month}-${x[0]}`);
        const chartDataY = chartData.map(x => {
            const money = x[1]
            if (money > 500) {
                return {
                    value: money,
                    itemStyle: {
                        color: "#2f0000"
                    }
                }
            }
            if (money > 100) {
                return {
                    value: money,
                    itemStyle: {
                        color: "red"
                    }
                }
            }
            if (money > 50) {
                return {
                    value: money,
                    itemStyle: {
                        color: "orange"
                    }
                }
            }
            return {
                value:money,
                itemStyle: {
                    color: 'green'
                }
            }

        });

        const option = {
            title: {
                text: `${year}年${month}月`,
                // subtext: 'Fake Data',
                left: 'center'
            },
            xAxis: {
                type: 'category',
                data: chartDataX
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: chartDataY,
                    type: 'bar',
                    "label": {
                        "show": true,
                        "position": "top",
                        "margin": 8
                    }
                }
            ],
            tooltip: {
                show: true,
                trigger: "item",
                triggerOn: "mousemove|click",
                axisPointer: {
                    "type": "line"
                },
                showContent: true,
                alwaysShowContent: false,
                showDelay: 0,
                hideDelay: 100,
                textStyle: {
                    fontSize: 14
                },
                borderWidth: 0,
                padding: 5
            }
        };
        chat.setOption(option);
    }

    componentDidUpdate(prevProps, prevState) {
        this.componentDidMount()
    }

    render() {
        return (
            <div className='default-chart' ref={el => this.el = el}></div>
        )
    }

}
