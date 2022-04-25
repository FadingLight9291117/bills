import { render, screen } from '@testing-library/react';
import { Api, config } from './api';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


// test('test api get', async () => {
//   const api = new Api(config);
//   const data = await api.getData(2022,4,22);
//   console.log(data);
// })


test('test api remove', async () => {
  const api = new Api(config);
  const data = await api.removeItemById(955);
  console.log(data);
})

