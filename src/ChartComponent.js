import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const datajson = [
  { "timestamp": "2023-01-01T00:00:00Z", "value": 10 },
  { "timestamp": "2023-01-02T00:00:00Z", "value": 12 },
  { "timestamp": "2023-01-03T00:00:00Z", "value": 5 },
  { "timestamp": "2023-01-04T00:00:00Z", "value": 8 },
  { "timestamp": "2023-01-05T00:00:00Z", "value": 15 },
  { "timestamp": "2023-01-06T00:00:00Z", "value": 20 },
  { "timestamp": "2023-01-07T00:00:00Z", "value": 18 },
  { "timestamp": "2023-01-08T00:00:00Z", "value": 14 },
  { "timestamp": "2023-01-09T00:00:00Z", "value": 11 },
  { "timestamp": "2023-01-10T00:00:00Z", "value": 9 },
  { "timestamp": "2023-01-11T00:00:00Z", "value": 7 },
  { "timestamp": "2023-01-12T00:00:00Z", "value": 13 },
  { "timestamp": "2023-01-13T00:00:00Z", "value": 16 },
  { "timestamp": "2023-01-14T00:00:00Z", "value": 18 },
  { "timestamp": "2023-01-15T00:00:00Z", "value": 21 },
  { "timestamp": "2023-01-16T00:00:00Z", "value": 23 },
  { "timestamp": "2023-01-17T00:00:00Z", "value": 25 },
  { "timestamp": "2023-01-18T00:00:00Z", "value": 22 },
  { "timestamp": "2023-01-19T00:00:00Z", "value": 19 },
  { "timestamp": "2023-01-20T00:00:00Z", "value": 17 },
  { "timestamp": "2023-01-21T00:00:00Z", "value": 14 },
  { "timestamp": "2023-01-22T00:00:00Z", "value": 12 },
  { "timestamp": "2023-01-23T00:00:00Z", "value": 10 },
  { "timestamp": "2023-01-24T00:00:00Z", "value": 8 },
  { "timestamp": "2023-01-25T00:00:00Z", "value": 6 },
  { "timestamp": "2023-01-26T00:00:00Z", "value": 4 },
  { "timestamp": "2023-01-27T00:00:00Z", "value": 7 },
  { "timestamp": "2023-01-28T00:00:00Z", "value": 12 },
  { "timestamp": "2023-01-29T00:00:00Z", "value": 15 },
  { "timestamp": "2023-01-30T00:00:00Z", "value": 18 }
];

const ChartComponent = () => {
  const [graphData, setGraphData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [timeRange, setTimeRange] = useState('all'); // Default to 'all'

  // Process data to format the timestamp
  const preprocessData = (data) => {
    return data.map(item => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
  };

  // Filter data based on the selected range
  const filterData = (data, range) => {
    const now = new Date();
    let filtered;

    switch (range) {
      case 'daily':
        filtered = data.filter(item => {
          const itemDate = new Date(item.timestamp);
          return itemDate.toDateString() === now.toDateString();
        });
        break;

      case 'weekly':
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Start of the week (Sunday)
        filtered = data.filter(item => {
          const itemDate = new Date(item.timestamp);
          return itemDate >= startOfWeek && itemDate <= now;
        });
        break;

      case 'monthly':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the month
        filtered = data.filter(item => {
          const itemDate = new Date(item.timestamp);
          return itemDate >= startOfMonth && itemDate <= now;
        });
        break;

      default: // 'all'
        filtered = data;
    }

    // Sort the filtered data by timestamp
    filtered.sort((a, b) => a.timestamp - b.timestamp);

    return filtered.map(item => ({
      ...item,
      timestamp: item.timestamp.toLocaleDateString()
    }));
  };

  // Initialize data on component mount
  useEffect(() => {
    const processedData = preprocessData(datajson);
    setGraphData(processedData);
    setFilteredData(filterData(processedData, timeRange)); // Initialize with all data
  }, [timeRange]);

  // Filter data when the time range changes
  useEffect(() => {
    const updatedFilteredData = filterData(graphData, timeRange);
    setFilteredData(updatedFilteredData);
  }, [timeRange, graphData]);

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <div style={{ marginTop: "50px" }}>
        <button onClick={() => setTimeRange('daily')} style={{ color: "#fff", backgroundColor: "#000", borderRadius: "5px", padding: "5px", margin: "4px" }}>Daily</button>
        <button onClick={() => setTimeRange('weekly')} style={{ color: "#fff", backgroundColor: "#000", borderRadius: "5px", padding: "5px", margin: "4px" }}>Weekly</button>
        <button onClick={() => setTimeRange('monthly')} style={{ color: "#fff", backgroundColor: "#000", borderRadius: "5px", padding: "5px", margin: "4px" }}>Monthly</button>
        <button onClick={() => setTimeRange('all')} style={{ color: "#fff", backgroundColor: "#000", borderRadius: "5px", padding: "5px", margin: "4px" }}>All</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={filteredData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
