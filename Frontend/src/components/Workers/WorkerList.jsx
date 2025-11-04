import React from 'react';
import WorkerCard from './WorkerCard';
import IcePanel from '../IcePanel';

const WorkerList = () => {
  // Mock worker data - in a real app, this would come from your backend
  const workers = [
    { id: 'W001', name: 'Priya Sharma', joinDate: '15 Jan 2022', collections: 42, area: 'North Zone', status: 'active' },
    { id: 'W002', name: 'Rajesh Kumar', joinDate: '20 Mar 2022', collections: 38, area: 'South Zone', status: 'active' },
    { id: 'W003', name: 'Sunita Patel', joinDate: '05 May 2022', collections: 35, area: 'East Zone', status: 'active' },
    { id: 'W004', name: 'Anil Gupta', joinDate: '12 Aug 2022', collections: 0, area: 'West Zone', status: 'inactive' },
    { id: 'W005', name: 'Meena Singh', joinDate: '30 Sep 2022', collections: 28, area: 'Central Zone', status: 'active' },
  ];

  return (
    <IcePanel title="Worker Management" glowColor="#4fc3f7">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {workers.map(worker => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </IcePanel>
  );
};

export default WorkerList;