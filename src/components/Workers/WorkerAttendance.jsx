import React, { useState } from 'react';
import IcePanel from '../IcePanel';
import { FaUserCheck, FaUserTimes, FaCalendarDay } from 'react-icons/fa';

const WorkerAttendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  
  // Mock worker data
  const workers = [
    { id: 'W001', name: 'Priya Sharma' },
    { id: 'W002', name: 'Rajesh Kumar' },
    { id: 'W003', name: 'Sunita Patel' },
    { id: 'W004', name: 'Anil Gupta' },
    { id: 'W005', name: 'Meena Singh' },
  ];

  const handleAttendanceChange = (workerId, isPresent) => {
    setAttendance(prev => ({
      ...prev,
      [workerId]: isPresent
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic would go here
    console.log('Attendance recorded:', { date, attendance });
  };

  return (
    <IcePanel title="Worker Attendance" glowColor="#4fc3f7">
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <FaCalendarDay color="#4fc3f7" size={20} />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 0.8)'
            }}
          />
        </div>
        
        <div style={{
          marginBottom: '20px',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{
                background: 'linear-gradient(135deg, var(--ice-accent), var(--ice-dark))',
                color: 'white'
              }}>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Worker</th>
                <th style={{ padding: '12px 15px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {workers.map(worker => (
                <tr key={worker.id} style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                  background: attendance[worker.id] === true 
                    ? 'rgba(0, 200, 83, 0.1)'
                    : attendance[worker.id] === false
                      ? 'rgba(255, 82, 82, 0.1)'
                      : 'transparent'
                }}>
                  <td style={{ padding: '12px 15px' }}>{worker.name}</td>
                  <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => handleAttendanceChange(worker.id, true)}
                        style={{
                          background: attendance[worker.id] === true 
                            ? '#00C853' 
                            : 'rgba(0, 200, 83, 0.2)',
                          color: attendance[worker.id] === true ? 'white' : '#00C853',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <FaUserCheck /> Present
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAttendanceChange(worker.id, false)}
                        style={{
                          background: attendance[worker.id] === false 
                            ? '#FF5252' 
                            : 'rgba(255, 82, 82, 0.2)',
                          color: attendance[worker.id] === false ? 'white' : '#FF5252',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <FaUserTimes /> Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="ice-button" style={{
            padding: '12px 24px',
            fontSize: '14px'
          }}>
            Save Attendance
          </button>
        </div>
      </form>
    </IcePanel>
  );
};

export default WorkerAttendance;