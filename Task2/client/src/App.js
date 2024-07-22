import React from "react";
import Cards from "./components/Cards/Cards";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CardDetails from "./components/CardDetails/CardDetails";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" exact component={() => <Redirect to="/cards" />} /> */}
          <Route path="/" Component={Cards} />
          {/* <Route path="/posts/search" exact component={Home} /> */}
          <Route path="/card/:id" Component={CardDetails} />
          {/* <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
