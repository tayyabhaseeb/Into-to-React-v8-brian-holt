import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AdoptedContext } from "./App";
import useBreedList from "./Hooks/useBreedList";
import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
//const Breeds = ["spar"];
// `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`;

const SearchParams = () => {
  //   const location = "Seattle, WA";
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [Breeds] = useBreedList(animal); // from custom hook
  const { adoptedPet } = useContext(AdoptedContext);

  useEffect(() => {
    callData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function callData() {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const data = await response.json();
    setPets(data.pets);
    // console.log(data.pets);
  }

  function handleSubmit(e) {
    // this e is not dom event but a synthetic react event
    e.preventDefault();
    callData();
  }

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        {
          adoptedPet ? (
            <div className="pet image-container">
              <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
            </div>
          ) : null // you have to remove this semi-colon, my auto-formatter adds it back if I delete it
        }
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => {
              return (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              );
            })}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            disabled={Breeds.length === 0}
          >
            <option />
            {Breeds.map((breed) => {
              return (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              );
            })}
          </select>
        </label>

        <button>Submit</button>
      </form>
      {/* {pets.map((pet) => {
        return (
          <Pet
            key={pet.id}
            animal={pet.animal}
            name={pet.name}
            breed={pet.breed}
          />
        );
      })} */}

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
