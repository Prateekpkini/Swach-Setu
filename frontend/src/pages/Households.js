import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Households = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/households')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Household Data - Aranthodu</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Head</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Waste Type</th>
            <th>Fee Status</th>
            <th>Collection Frequency</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.household_id}</td>
              <td>{row.head_of_household}</td>
              <td>{row.latitude}</td>
              <td>{row.longitude}</td>
              <td>{row.waste_type_preference}</td>
              <td>{row.fee_status}</td>
              <td>{row.collection_frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Households;