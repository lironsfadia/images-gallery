
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
  
  export function DataProvider({ calculator : Calculator, layout: Layout, url }){
    const [data, setData] = useState(null);

    useEffect(() =>{
        if(url !== '') {
          const updateData = () => {
              axios.get(url, createAuthorizationHeaders()).then(response => {
                  console.log("SUCCESS", response)
                  setData(response.data)
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

DataProvider.propTypes = {
    calculator: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
};

export default DataProvider;