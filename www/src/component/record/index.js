import './index.css'
import {
    Input,
    Text,
    Spacer
} from '@nextui-org/react'


export default function Record(props) {
    return (
        <div className='record'>
            <Text h3>记账</Text>
            <Spacer y={1.6}/>
            <Input labelPlaceholder='金额' type='number'></Input>
        </div>
    )
}