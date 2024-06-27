
// import React, { useState, useEffect } from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const ChartComponent = () => {
//   const [graphData, setGraphData] = useState([]);

//   // Process data to format the timestamp
//   const preprocessData = (data) => {
//     return data.map(item => ({
//       ...item,
//       timestamp: new Date(item.timestamp).toLocaleDateString()
//     }));
//   };

//   useEffect(() => {
//     fetch('/data.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Fetched data:', data);
//         const processedData = preprocessData(data);
//         console.log('Processed data:', processedData);
//         setGraphData(processedData);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div style={{ width: '100%', height: "auto" }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart
//           data={graphData}
//           margin={{
//             top: 10,
//             right: 30,
//             left: 0,
//             bottom: 0,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timestamp" />
//           <YAxis />
//           <Tooltip />
//           <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ChartComponent;
// import React, { useState, useEffect } from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const ChartComponent = () => {
//   const [graphData, setGraphData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [timeRange, setTimeRange] = useState('daily');

//   // Process data to format the timestamp
//   const preprocessData = (data) => {
//     return data.map(item => ({
//       ...item,
//       timestamp: new Date(item.timestamp)
//     }));
//   };

//   // Filter data based on the selected range
//   const filterData = (data, range) => {
//     const now = new Date();
//     let filtered;

//     switch (range) {
//       case 'daily':
//         filtered = data.filter(item => {
//           const itemDate = new Date(item.timestamp);
//           return itemDate.toDateString() === now.toDateString();
//         });
//         break;

//       case 'weekly':
//         const weekAgo = new Date(now);
//         weekAgo.setDate(now.getDate() - 7);
//         filtered = data.filter(item => {
//           const itemDate = new Date(item.timestamp);
//           return itemDate >= weekAgo && itemDate <= now;
//         });
//         break;

//       case 'monthly':
//         const monthAgo = new Date(now);
//         monthAgo.setMonth(now.getMonth() - 1);
//         filtered = data.filter(item => {
//           const itemDate = new Date(item.timestamp);
//           return itemDate >= monthAgo && itemDate <= now;
//         });
//         break;

//       default:
//         filtered = data;
//     }

//     // Sort the filtered data by timestamp
//     filtered.sort((a, b) => a.timestamp - b.timestamp);

//     return filtered.map(item => ({
//       ...item,
//       timestamp: item.timestamp.toLocaleDateString()
//     }));
//   };

//   // Fetch data from the server
//   useEffect(() => {
//     fetch('/data.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         const processedData = preprocessData(data);
//         setGraphData(processedData);
//         setFilteredData(filterData(processedData, timeRange));
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   // Filter data when the time range or graph data changes
//   useEffect(() => {
//     setFilteredData(filterData(graphData, timeRange));
//   }, [timeRange, graphData]);

//   return (
//     <div style={{ width: '100%', height: 'auto' }}>
//       <div style={{marginTop:"50px"}}>
//         <button onClick={() => setTimeRange('daily')} style={{color:"#fff",backgroundColor:"#000",borderRadius:"5px",padding:" 5px",margin:"4px"}}>Daily</button>
//         <button onClick={() => setTimeRange('weekly')} style={{color:"#fff",backgroundColor:"#000",borderRadius:"5px",padding:" 5px",margin:"4px"}}>Weekly</button>
//         <button onClick={() => setTimeRange('monthly')} style={{color:"#fff",backgroundColor:"#000",borderRadius:"5px",padding:" 5px",margin:"4px"}}>Monthly</button>
//       </div>
//       <ResponsiveContainer width="100%" height={400}>
//         <AreaChart
//           data={graphData }
//           margin={{
//             top: 10,
//             right: 30,
//             left: 0,
//             bottom: 0,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timestamp" />
//           <YAxis />
//           <Tooltip />
//           <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ChartComponent;

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        filtered = data.filter(item => {
          const itemDate = new Date(item.timestamp);
          return itemDate >= weekAgo && itemDate <= now;
        });
        break;

      case 'monthly':
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        filtered = data.filter(item => {
          const itemDate = new Date(item.timestamp);
          return itemDate >= monthAgo && itemDate <= now;
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

  // Fetch data from the server
  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const processedData = preprocessData(data);
        setGraphData(processedData);
        setFilteredData(filterData(processedData, timeRange)); // Initialize with all data
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Filter data when the time range changes
  useEffect(() => {
    setFilteredData(filterData(graphData, timeRange));
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
