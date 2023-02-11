import React, { useState } from 'react'
import Form from './components/Form'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ShowBmi from './components/ShowBmi'
import { History } from './components/History';

function App() {

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [show, setShow] = useState(true);

  const bmiValues = (w, h, n, a) => {
    // console.log(w,h);
    setWeight(w);
    setHeight(h);
    setName(n);
    setAge(a);
  }
  const bmi = (weight / (height * height)).toFixed(2);
  const data = { name, age }

  const handler = () => {
    setShow(!show) 
  }

  return (
    <>
      <div className='navbar nav-bmi' >BMI Calculator
        <button onClick={handler}>History</button>
      </div>

      {show ?
        <div className='main-div'>
          <div className='top'>
            <Form getdata={bmiValues} bmi={bmi} />
            <div className='prog-desc'>
              <div className='progressBar' style={{ width: 200, height: 200 }}>
                <h2 className='progHeader'>Health Risk</h2>
                <CircularProgressbar
                  value={bmi < 18.5 ? 70 : bmi > 25 && bmi < 30 ? 75 : bmi > 30 ? 85 : bmi > 19 && bmi < 24.9 ? 15 : 5}
                  text={bmi < 18.5 ? 'High' : bmi > 25 && bmi < 30 ? 'High' : bmi > 30 ? 'Extreme' : bmi > 19 && bmi < 24.9 ? 'Normal' : ''}
                  background
                  backgroundPadding={4}
                />
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
        :
        <History />
      }
    </>
  )
}
export default App

