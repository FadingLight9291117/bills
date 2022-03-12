import './index.css'
import MPie from './MPie';
import MBar from './MBar';
import { useParams } from 'react-router-dom';
import { Spacer } from '@nextui-org/react';

export default function Chart() {
    const params = useParams();
    return (
        <div className='chart'>
            <MPie year={params.year} month={params.month} />
            <Spacer y={1.6} />
            <MBar year={params.year} month={params.month} />
        </div >
    )
}