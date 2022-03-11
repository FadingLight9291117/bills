import './index.css'
import { Component } from 'react';
import MPie from './MPie';


export default class Chart extends Component {
    componentDidMount() {
    }
    render() {
        return (<div className='chart'><MPie year={2022} month={3} /></div >)
    }
}