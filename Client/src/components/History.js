import React, { useEffect, useState } from 'react'
import axios from 'axios';


export const History = () => {

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/data')
      .then(res => {
        setDatas(res.data)
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  console.log(datas);

  return (
    <div>


      <table className="table">
        <thead>
          <tr >
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Height</th>
            <th scope="col">Weight </th>
            <th scope="col">bmi </th>
          </tr>
        </thead>
        {datas?.map((item, index) => (
          <tbody >
            <tr >
              <td key={index}>{index + 1} </td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td> {item.weight}</td>
              <td>{item.height}</td>
              <td> {item.bmi}</td>
            </tr>
          </tbody>
        ))}
      </table>   
    </div>
  )
}
