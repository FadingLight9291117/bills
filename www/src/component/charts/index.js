import './index.css'
import MPie from './MPie';
import MBar from './MBar';
import {
    Spacer,
    Button,
    Input,
    Card,
    Text,
} from '@nextui-org/react';
import { Api, config } from '../../api';
import React from 'react'

/**
 * TODO: 本月消费金额进度条
 */
export default class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.api = new Api(config)
        const date = new Date();
        this.state = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            data: [],
        };
    }

    async componentDidMount() {
        const data = await this.api.getData(this.state.year, this.state.month);
        this.setState({
            data: data
        });

    }

    buttonClick = async (e) => {
        const year = this.yearIpt.value
        const month = this.monthIpt.value
        if (year && month) {
            const data = await this.api.getData(year, month);
            this.setState({
                year: year,
                month: month,
                data: data
            })
        }
    }


    render() {
        const colors = [
            'success',
            'warning',
            'error'
        ];
        let totalMoney = 0;
        this.state.data.forEach(item => totalMoney += item['money']);
        totalMoney = totalMoney.toFixed(2);
        let color = colors[0];
        if (totalMoney > 1200) {
            color = colors[1];
        }
        if (totalMoney > 2000) {
            color = colors[2]
        }
        return (
            <div className='chart'>
                <Input label="year" placeholder={this.state.year} ref={el => this.yearIpt = el} />
                <Input label='month' placeholder={this.state.month} ref={el => this.monthIpt = el} />
                <Spacer y={0.8} />
                <Button onClick={this.buttonClick}>查询</Button>
                <Spacer y={0.8} />
                <Card css={{ mw: '200px' }} color={color}>
                    <Text color="white">-￥{totalMoney}</Text>
                </Card>
                <Spacer y={1.6} />
                <MPie year={this.state.year} month={this.state.month} data={this.state.data} />
                <Spacer y={1.6} />
                <MBar year={this.state.year} month={this.state.month} data={this.state.data} />
            </div >
        )
    }
}