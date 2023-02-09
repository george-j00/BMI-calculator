import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ShowBmi from './components/ShowBmi'

import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import axios from 'axios';


function App() {

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const [datas, setDatas] = useState([]);

  const [showHistory, setShowHistory] = useState(false)

  //   useEffect(() => {

  //   axios.get('http://localhost:3001/api/data')
  //       .then(res => {
  //         setDatas(res.data)
  //         // console.log(res, ' handler');
  //         console.log(datas, 'datas');
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       })

  // }, [])


  const bmiValues = (w, h, n, a) => {
    // console.log(w,h);
    setWeight(w);
    setHeight(h);
    setName(n);
    setAge(a);
  }
  // console.log(weight, height)

  const bmi = (weight / (height * height)).toFixed(2);
  const data = { name, age }

  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen>
      {/* {
         axios.get('http://localhost:3001/api/data')
      .then(res => {
        setDatas(res.data)
        // console.log(res, ' handler');
        console.log(datas, 'datas');
      })
      .catch(error => {
        console.error(error);
      })
      } */}
      <p>History</p>
      {
        showHistory &&

        <div >
          {


            // console.log(item.name, 'item')
            // <p>{item.name}</p>

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
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td> {item.weight}</td>
                    <td>{item.height}</td>
                    <td> {item.bmi}</td>
                  </tr>

                </tbody>
              ))}
            </table>
          }
        </div>
      }
      <button onClick={hideModal}>Close</button>
    </ReactModal> 
  ));

  const handler = () => {

    setShowHistory(!showHistory)
    axios.get('http://localhost:3001/api/data')
      .then(res => {
        setDatas(res.data)
        // console.log(res, ' handler');
        console.log(datas, 'datas');
      })
      .catch(error => {
        console.error(error) ;
      })

  }

 
  return (
    <>

      {/* <Routes>
      
        <Route path="history" element={<History />} />
      </Routes> */}
      <div className='navbar nav-bmi' >BMI Calculator

        {/* <div >
          <Link to="/history">History</Link>
        </div> */}

        <button onClick={showModal}>Histroy</button>

        <button onClick={handler}> History</button>
      </div>


      <div className='main-div'>

        {showHistory &&

          <div >
            {
              datas?.map((item) => (

           // *********** make change in code to reflect the history table ************************
                <p>{item.name}</p>
               

              ))
            }
          </div>}

        <div>

        </div>

        <div className='top'>
          <Form getdata={bmiValues} bmi={bmi} />
          <div className='prog-desc'>
            <div className='progressBar' style={{ width: 200, height: 200 }}>
              <h2 className='progHeader'>Health Risk</h2>
              <CircularProgressbar
                value={bmi < 18.5 ? 70 : bmi > 25 && bmi < 30 ? 75 : bmi > 30 ? 85 : bmi > 19 && bmi < 24.9 ? 15 : 10}
                text={bmi < 18.5 ? 'High' : bmi > 25 && bmi < 30 ? 'High' : bmi > 30 ? 'Extreme' : bmi > 19 && bmi < 24.9 ? 'Normal' : ''}
                background
                backgroundPadding={4}
              />

              {/* <CircularProgressbar value={bmi < 18.5 ? 80 : bmi >24.9  ? 85 : 25} text={bmi < 18.5 ? 'high' : bmi >24.9 ? 'high' : 'normal'}  /> */}
            </div>
            <div className='progDesc'>
              {bmi < 18.5 ?
                <div>
                  <h3 className='ml-4'>Time to grab a bite</h3>
                  <p>
                    By maintaining a healthy weight , you lower risk of developing serious health problems
                  </p>
                </div> :
                bmi > 25 && bmi < 30 ?
                  <div>
                    <h3 className='ml-5'>Time to run !</h3>
                    <p>
                      By maintaining a healthy weight , you lower risk of developing serious health problems
                    </p>
                  </div> :
                  bmi > 30 ?
                    <div>
                      <h3 className='ml-5'>Time to run !</h3>
                      <p>
                        By maintaining a healthy weight , you lower risk of developing serious health problems
                      </p>
                    </div> :
                    ''}
            </div>
          </div>
        </div>
        <ShowBmi bmiScore={bmi} data={data} />
      </div>
    </>
  )
}

export default App

