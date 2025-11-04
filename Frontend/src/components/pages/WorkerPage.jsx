import React from 'react';
import WorkerList from '../components/Workers/WorkerList';
import WorkerAttendance from '../components/Workers/WorkerAttendance';

const WorkerPage = () => {
  return (
    <div style={{ display: 'grid', gap: '30px' }}>
      <WorkerAttendance />
      <WorkerList />
    </div>
  );
};

export default WorkerPage;