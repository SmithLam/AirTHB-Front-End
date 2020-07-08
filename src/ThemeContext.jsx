
import React, { useState } from 'react'


export const StoreContext = React.createContext(null);

export default ({ children }) => {
    // các em đã vào nhà kho
    const [expList, setExpList] = useState(null)
    const [currentPage,setCurrentPage]=useState(1)
    const [dataLength,setDataLength]=useState(1)
    const [tag,setTag]=useState(null)
    const [minPrice,setMinPrice]=useState(0);
    const [maxPrice,setMaxPrice]=useState(100);
   

    
    let backEndUrlExperienceList=`https://airthb-group6.herokuapp.com/experiences?price[$gt]=${minPrice}&price[$lt]=${maxPrice}&page=${currentPage}`
    if(tag)
    {
         backEndUrlExperienceList=`https://airthb-group6.herokuapp.com/experiences?price[$gt]=${minPrice}&price[$lt]=${maxPrice}&page=${currentPage}&tags=${tag}`
    }
    






    const store = {
        expList: [expList, setExpList],
        currentPage:[currentPage,setCurrentPage],
        dataLength:[dataLength,setDataLength],
        expListURL:backEndUrlExperienceList,
        minPrice:[minPrice,setMinPrice],
        maxPrice:[maxPrice,setMaxPrice],
        tag:[tag,setTag]

    };

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};