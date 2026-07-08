import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:7199/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboard(response.data);
      } catch (error) {
        console.error('Error fetching dashboard', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h1>Welcome, {dashboard?.fullName || 'Student'}!</h1>
      
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3>{dashboard?.pendingAssignments || 0}</h3>
              <p>Pending Assignments</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3>{dashboard?.upcomingEvents || 0}</h3>
              <p>Upcoming Events</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3>{dashboard?.studyStreak || 0}</h3>
              <p>Study Streak</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3>{dashboard?.gpaTrend || 0}</h3>
              <p>GPA Trend</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-5">Today's Tasks</h3>
      <ul className="list-group">
        {dashboard?.todayTasks?.map(task => (
          <li key={task.id} className="list-group-item">
            {task.title} - {task.relatedTo} ({task.priority})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;