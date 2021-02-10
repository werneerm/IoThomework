import './App.css';
import DigitReader from './DigitReader'
import text from './text/test.js'


function App() {
  return (
    <div className="App">
      <h1>Bank OCR</h1>
      <ul>
        <div className="listItem">
          <li>
          Account number
          </li>
          <li>Status</li>

        </div>
        {/*Here we mapping trough all the account numbers and passing them as props one by one*/}
        {text.map((account)=>{
       return <DigitReader raw={account}/>
      })}
      </ul>
     
    </div>
  );
}

export default App;
