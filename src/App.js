
import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Headerr from './components/Header/header';



function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect( () => {
tg.ready();
  }, [])

  return (
    <div className="App">
      <Headerr />
    <button onClick={onToggleButton}>toogle</button>
      
    </div>
  );
}

export default App;
