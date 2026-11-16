import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import MovieDetails from "./MovieDetails";

    function App() {
        return (
            <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/:id" element={<MovieDetails />} />
                    </Route>
                </Routes>

            </div>
            </Router>
        );
    }
  
export default App;
