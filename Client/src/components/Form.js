import React, { useState } from 'react'

import axios from 'axios';


function Form({ getdata, bmi }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [alert, setAlert] = useState(true);

  const [newData, setNewData] = useState([]);

  const onsubmit = (e) => {
    e.preventDefault();
    if (isNaN(weight) || isNaN(height)) {
      setAlert(true)
    } else {
      setAlert(false)
      getdata(weight, height, name, age);
    }
  }
  // const bmiscore = { bmi } 

  const data = {
    name: name, 
    age: age,
    height: height, 
    weight: weight,
    bmi:(weight / (height * height)).toFixed(2)

  } 
  const submitHandler = () => {

    axios.post('http://localhost:3001/api/insert/', data)
      .then((res) => {
        console.log("inserted")
      })
      .catch(err => console.log("Error: " + err));
  }

  return (
    <>
      <div className='container '>
        <form onSubmit={onsubmit}>
          <div className='bmi-form'>
            <div className="row">
              <div className="col col-sm-6">
                <label className="form-label">Name :</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="col col-sm-6">
                <label className="form-label">Age:</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="col col-sm-6">
                <div className="my-2">
                  <label className="form-label">Weight(kg) :</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>   
              <div className="col col-sm-6">
                <div className="my-2">
                  <label className="form-label">Height(m) :</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="radio-button my-3 mx-3 ">
                <input type="radio" value="Male" name="gender" required /> Male
                <input type="radio" value="Female" name="gender" required /> Female
              </div>
            </div>
            <button
              type="submit" className="btn btn-primary bmi-button" onClick={submitHandler} >GET BMI</button>
          </div>
        </form>  
        {alert ? <div className='alert'>Enter valid data</div> : ''}
      </div>  
    </>
  )
}

export default Form