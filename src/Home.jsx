
import 
{  BsPeopleFill,  BsPerson,  BsCardChecklist}
 from 'react-icons/bs'
 import React, { useState } from 'react';
import { useEffect } from 'react';
 

function Home() {

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
      const [data1, setData] = useState([]);
      useEffect(()=>{
        (async function() {
          try {
            const responce = await fetch("http://localhost:8081/getall");
            setData(await responce.json());
          } catch (e) {
              console.error(e);
          }
      })();
          
      },[])

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Total Patient</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{
                  data1.length
                  }</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Admitted Pateint</h3>
                    <BsPerson className='card_icon'/>
                </div>
                <h1>{
                     data1.length
                  }</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Pending Bill</h3>
                    <BsCardChecklist className='card_icon'/>
                </div>
                <h1>{
                    data1.length}</h1>
            </div>
            
        </div>

       
    </main>
  )
}

export default Home