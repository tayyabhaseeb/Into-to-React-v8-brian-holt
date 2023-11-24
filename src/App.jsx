import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import { useState } from "react";
import { createContext } from "react";

export const AdoptedContext = createContext();

function App() {
  const [adoptedPet, setAdoptedPet] = useState(null);

  return (
    <AdoptedContext.Provider value={{ adoptedPet, setAdoptedPet }}>
      <BrowserRouter>
        <header>
          <Link to="/">Adopt Me</Link>
        </header>
        <Routes>
          <Route path="/" element={<SearchParams />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </AdoptedContext.Provider>
  );
}

export default App;
