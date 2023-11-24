import Pet from "./Pet";

function Results({ pets }) {
  if (!pets.length) {
    return (
      <div className="search">
        <h1>No Results</h1>
      </div>
    );
  }
  return (
    <div className="search">
      {pets.map((pet) => {
        return (
          <Pet
            key={pet.id}
            animal={pet.animal}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            city={pet.city}
            id={pet.id}
          />
        );
      })}
    </div>
  );
}

export default Results;
