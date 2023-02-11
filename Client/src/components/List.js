import React from 'react'

function List({list}) {

 

  const lists = [
    {
      name: 'Under weight',
      bmi : 'Below 18.5',
      risk: 'Increase'
    },
    {
      name: 'Normal weight',
      bmi : '19 to 24.9',
      risk: 'NILL'
    },
    {
      name: 'Over weight',
      bmi : '25 to 30',
      risk: 'Increase'
    },
    {
      name: 'Obese',
      bmi : 'Above 30',
      risk: 'High'
    },
  ]

  return (
    <>
      
      <div className='bmi_list'>
        <table className="table">

          <thead>
            <tr >
            <th scope="col">No.</th>
              <th scope="col">Type</th>
              <th scope="col">Bmi</th>
              <th scope="col">Health risk</th>
            </tr>
          </thead>
        {lists.map((item, index) => (
          <tbody >
            <tr key={index} style={list === item.name ?  {backgroundColor:'mediumseagreen' } :  {backgroundColor: 'white'}}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              {/* using entity no.for < symbol '&#60;' */}
              <td>{item.bmi}</td>
              <td> {item.risk}</td>
            </tr>
           
          </tbody>
          ))}
        </table>
      </div>


    </>
  )
}

export default List