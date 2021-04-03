import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'


axios.get('https://restcountries.eu/rest/v2/all').then(response => {
  const data= response.data
  ReactDOM.render(
    <App data= {data}/>,
    document.getElementById('root')
  )
})