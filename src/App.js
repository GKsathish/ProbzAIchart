import React from 'react';
import ChartComponent from './ChartComponent';
import './App.css'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Chart Example</h1>
      </header>
      <main className="App-main">
        <ChartComponent />
      </main>
      <footer className="App-footer">
        <p>Footer content here</p>
      </footer>
    </div>
  );
};

export default App;
