import './index.css'
import {
    Input,
    Text,
    Spacer,
    Button,
    Textarea,
} from '@nextui-org/react'
import React from 'react'
import { Api, config } from '../../api'

export default class Record extends React.Component {
    constructor(props) {
        super(props)
        this.api = new Api(config)
        const now = new Date()
        this.today = `${now.getFullYear()}-${this.formateDate(now.getMonth() + 1)}-${this.formateDate(now.getDate())}`
    }

    formateDate(number) {
        number = number.toString()
        return number.length === 1 ? '0' + number : number
    }

    componentDidMount() {
    }

    btnOnClick = e => {
        const data = {
            date: this.dateEl.value,
            money: parseFloat(this.moneyEl.value !== '' ? this.moneyEl.value : 0),
            cls: this.clsEl.value,
            label: this.labelEl.value,
            options: this.optionsEl.value,
        }
        if (data.money == 0) {
            return
        }
        this.api.postData(data).then(res => {
            alert('记录成功!');
            this.clear();
        })
    }

    clear() {
        // this.dateEl.value = this.today;
        this.moneyEl.value = '';
        this.clsEl.value = '';
        this.labelEl.value = '';
        this.optionsEl.value = '';
    }

    render() {
        return (
            <div className='record'>
                <Text h3>记账</Text>
                <Spacer />
                <Input label="日期" type="date" initialValue={this.today} width='200px' ref={el => this.dateEl = el} />
                <Spacer />
                <Input label="金额" type="number" width='200px' ref={el => this.moneyEl = el}></Input>
                <Spacer />
                <Input label="类别" type="text" width='100px' ref={el => this.clsEl = el}></Input>
                <Input label="标签" type="text" width='100px' ref={el => this.labelEl = el}></Input>
                <Spacer />
                <Textarea label='备注' width='200px' ref={el => this.optionsEl = el} />
                <Spacer />
                <Button onClick={this.btnOnClick}>确认</Button>
            </div>

        )
    }
}