import './App.css';
import Create from './components/Create';
import Register from './components/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ListEmp from './components/ListEmp';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/create' element={<Register/>}/>
          <Route path='/list' element={<ListEmp/>}/>
          <Route path='/edit/:id' element={<Register/>}/>
        </Routes>
      </Router>
      {/* <Create/> */}
    </div>
  );
}

export default App;
