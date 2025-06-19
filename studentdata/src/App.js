import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentTable from './StudentTable';
import CreateStudent from './CreateStudent';
import './App.css';
import EditStudent from './EditStudent';
import ViewDetails from './ViewDetails';
import './index.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentTable />} />
        <Route path="/student/create" element={<CreateStudent />} />
        <Route path="/student/edit/:studentid" element={<EditStudent/>} />
         <Route path="/student/view/:studentid" element={<ViewDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
