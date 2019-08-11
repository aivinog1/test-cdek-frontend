import React from 'react';
import './App.css';
import AppRouter from "./route/AppRouter";
import "antd/dist/antd.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter/>
    </div>
  );
};

export default App;
