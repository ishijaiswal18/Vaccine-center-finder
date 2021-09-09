import { useState } from 'react';
import './App.css';
import Body from './Components/Body/Body'
import Header from './Components/Header/Header'

function App() {

  const [form_state, setform_state] = useState(0)

  const handleClick = () => {
    setform_state(0)
  }

  return (
    <div className="h-full w-full bg-blue-50 to-red-500">
      <Header onClick={()=> handleClick()} />
      <Body formSetter={setform_state} form_state={form_state} />
      {/* Footer */}
    </div>
  );
}

export default App;
