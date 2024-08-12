import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { useEffect } from 'react';

const App = () => {
  const ToggleTheme = () => {
    let theme = localStorage.getItem('theme');
    if (theme == null) {
      theme = 'light';
      localStorage.setItem('theme', theme);
    }

    document.documentElement.classList.toggle('dark', theme === 'dark');
  };

  useEffect(() => {
    ToggleTheme();
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
