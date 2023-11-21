import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ShowDetails = ({ patient }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    async function getData() {
        let response = await fetch(
            "http://localhost:8081/get_details",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    patientId: searchParams.get("patientId")
                })
            }
        );
        let result = await response.json();
        if (result.status === "success") {
            console.log(result);
            setData(result.admits)
        } else {
            alert("Error occured");
            console.log(result);
        }
    }
    getData();
}, []);

const handleTemperature = ( admitId) => {
  navigate(
      `/temperature?admitId=${admitId}&patientId=${searchParams.get("patientId")+1}&patientName=${searchParams.get("patientName")}`
  );
};
  return (
    <div>
      <h2>Patient Id:{searchParams.get("patientId")+1}</h2>
      <h2>Patient Name:{searchParams.get("patientName")}</h2>   
    
      <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                     
                        <th>Admitted Date</th>
                        <td>discharge Dates</td>
                      
                        <th>Temperature</th>
                   

                      
                       
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row._id + 1}</td>
                         
                         
                            <td>{row.admitDate}</td>
                            <td>{row.dischargeDate}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleTemperature(
                                            row._id
                                        )
                                    }
                                >
                                    Check
                                </button>
                            </td>
                          
                        
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  );
};

export default ShowDetails;
