
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { getRequestContext } from '../contexts/Context'

function createAuthorizationHeaders() {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    };
  }
  
  export function DataProvider({ calculator : Calculator, layout: Layout, url, dataAmount }){
    const [data, setData] = useState(null);

    useEffect(() =>{
        if(url !== '') {
          const updateData = () => {
              axios.get(url, createAuthorizationHeaders()).then(response => {
                  setData(response.data.slice(0, dataAmount))
              }).catch(error => {
                  console.log(error)
              })
            }
            updateData();
        }
    },[url])

    const { Provider } = getRequestContext;

    return(
        <Provider value={data}>
            <Calculator layout={Layout}/>
        </Provider>
    )
}

DataProvider.defaultProps = {
  dataAmount: 100
}

DataProvider.propTypes = {
    calculator: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    dataAmount: PropTypes.number.isRequired,
};

export default DataProvider;