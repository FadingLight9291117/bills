import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Chart from './charts';
import {
  Input,
  Button,
  Spacer,
} from '@nextui-org/react';


const Component = () => {
  return (
    <div>
      <Spacer y={1.6} />
      <Input.Password labelPlaceholder="Password" initialValue="nextui123" />
      <Spacer y={1.6} />
      <Button>Click me</Button>
    </div>
  )
};

const Index = function () {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <Component />
    </header>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Index />}></Route> */}
          <Route path="/:year/:month" element={<Chart />}></Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
