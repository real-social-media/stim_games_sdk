import logo from './logo.svg';
import './App.css';
import {  IframeActionKind, PermissionType, User } from 'real-experiences-sdk'
import { useEffect, useState } from 'react';


const name = 'Elden Ring'

function App() {
  const [s, setS] = useState('INITIAL')

  const getDetails = async () => {
    await User.askPermission(name, PermissionType.GET_USER_ID)
  }

  useEffect( () => {
    
    
    window.addEventListener(
      'message',
      function (e) {
        switch (e.data.type) {
          case IframeActionKind.GetUserDetails:
          // case IframeActionKind.GetUserDetails:
            // setS('Get Details')
            setS(JSON.stringify(e.data))
            // api call (server)
            break
            case IframeActionKind.LoadExperience:
                setS(JSON.stringify(e?.data))
                // setS('Loaded')
                getDetails()
                
            break
          default:
            break
        }
      },
      false,
    )

  }, [])

  
  return (
    <div className="App">
      <header className="App-header">
        <div>{name}</div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          >
          Learn React
        </a>
          <div>{s}</div>
      </header>
    </div>
  );
}

export default App;
