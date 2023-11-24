// images ==> array

import { useState } from "react";

function Carousel({ images }) {
  const [active, setActive] = useState(0);
  //console.log(images);

  if (!images) {
    return <h1>Images not found</h1>;
  }

  return (
    <div className="carousel">
      <img src={images[active]} alt="animal" />{" "}
      <div className="carousel-smaller">
        {" "}
        {images.map((photo, index) => (
          <img
            key={photo}
            src={photo}
            className={index === active ? "active" : ""}
            alt="animal thumbnail"
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
