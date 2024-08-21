// src/App.tsx
import React from 'react';
import Providers from './Providers';
import AppRoutes from './rutas/rutas';

const App: React.FC = () => {
  return (
      <Providers>
        <AppRoutes />
      </Providers>
  );
};

export default App;
