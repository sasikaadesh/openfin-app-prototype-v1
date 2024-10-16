import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fin } from '@openfin/core';
import SecondWindow from './SecondWindow';
import MainWindow from './MainWindow';
import ThirdWindow from './ThirdWindow';
import FourthWindow from './FourthWindow';

const App = () => {
  useEffect(() => {
    if (typeof fin !== 'undefined') {
      console.log('Running in OpenFin context');
      createSecondWindow(); // Lazy load SecondWindow on startup
    } else {
      console.log('Not running in OpenFin context.');
    }
  }, []);

  const createSecondWindow = async () => {
    try {
      await fin.Window.create({
        name: 'SecondWindow',
        url: 'http://localhost:3000/second-window',
        defaultWidth: 600,
        defaultHeight: 400,
        autoShow: true
      });

      console.log('Second window created');
    } catch (error) {
      console.error('Error creating second window:', error);
    }
  };

  const createThirdWindow = async () => {
    try {
      await fin.Window.create({
        name: 'ThirdWindow',
        url: 'http://localhost:3000/third-window',
        defaultWidth: 600,
        defaultHeight: 400,
        autoShow: true
      });
      console.log('Third window created');

      // Group with SecondWindow (snap and dock)
      const secondWindow = await fin.Window.wrap({ uuid: fin.me.identity.uuid, name: 'SecondWindow' });
      const thirdWindow = await fin.Window.wrap({ uuid: fin.me.identity.uuid, name: 'ThirdWindow' });
      await secondWindow.joinGroup(thirdWindow);
    } catch (error) {
      console.error('Error creating third window:', error);
    }
  };

  const createFourthWindow = async () => {
    try {
      await fin.Window.create({
        name: 'FourthWindow',
        url: 'http://localhost:3000/fourth-window',
        defaultWidth: 800,
        defaultHeight: 100,
        autoShow: true
      });
      console.log('Fourth window created');

      // Group with SecondWindow and ThirdWindow (snap and dock)
      const secondWindow = await fin.Window.wrap({ uuid: fin.me.identity.uuid, name: 'SecondWindow' });
      const thirdWindow = await fin.Window.wrap({ uuid: fin.me.identity.uuid, name: 'ThirdWindow' });
      const fourthWindow = await fin.Window.wrap({ uuid: fin.me.identity.uuid, name: 'FourthWindow' });
      await secondWindow.joinGroup(thirdWindow);
      await secondWindow.joinGroup(fourthWindow);
      await thirdWindow.joinGroup(fourthWindow);
    } catch (error) {
      console.error('Error creating Fourth window:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/second-window" element={<SecondWindow />} />
        <Route path="/third-window" element={<ThirdWindow />} />
        <Route path="/fourth-window" element={<FourthWindow />} />
        <Route path="/" element={<MainWindow createThirdWindow={createThirdWindow} createFourthWindow={createFourthWindow} />} />
      </Routes>
    </Router>
  );
};

export default App;
