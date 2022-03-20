import * as echarts from "echarts"
import { Component } from 'react';
import React from "react"
import LabelPie from "./LabelPie";

class MPie extends Component {
    async componentDidMount() {
        const chat = echarts.init(this.el, null, {
            width: this.props.width ? this.props.width : 600,
            height: this.props.height ? this.props.height : 300,
        });

        const year = this.props.year;
        const month = this.props.month;
        const data = this.props.data;

        // 统计
        const data_map = new Map()
        data.forEach((v, k) => {
            const cls = v['cls'].trim()
            const money = v['money']
            const clsMoney = data_map.get(cls) ? data_map.get(cls) + money : money
            data_map.set(cls, clsMoney)
        })

        const chartData = []

        data_map.forEach((v, k) => {
            chartData.push({
                value: v.toFixed(1),
                name: k

            })
        })

        const option = {
            title: {
                text: `${year}年${month}月`,
                // subtext: 'Fake Data',
                left: 'center'
            },

            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            // toolbox: {
            //     show: true,
            //     feature: {
            //         mark: { show: true },
            //         dataView: { show: true, readOnly: false },
            //         restore: { show: true },
            //         saveAsImage: { show: true }
            //     }
            // },
            series: [
                {
                    name: `${year}-${month}`,
                    type: 'pie',
                    radius: [20, 100],
                    // center: ['25%', '50%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 5
                    },
                    label: {
                        show: true,
                        // position: "top",
                        margin: 8,
                        formatter: "{b}: {c}"
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: chartData,
                }
            ]
        };
        chat.setOption(option);
        chat.on('click', params => {

        });
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

export default MPie;