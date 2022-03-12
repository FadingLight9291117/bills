import './index.css'
import MPie from './MPie';
import MBar from './MBar';
import { useParams } from 'react-router-dom';
import { Spacer } from '@nextui-org/react';

export default function Chart() {
    const params = useParams();
    const year = params.year ? params.year : new Date().getFullYear();
    const month = params.month ? params.month : new Date().getMonth() + 1;

    // todo(): 把api数据的获取放在外面，好处是所有的图表只需获取一次数据；而且可以便于更新图表。
    const data = await api.getData(year, month);



    return (
        <div className='chart'>
            <MPie year={year} month={month} />
            <Spacer y={1.6} />
            <MBar year={year} month={month} />
        </div >
    )
}