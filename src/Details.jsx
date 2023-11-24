import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";

import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useContext } from "react";
import { AdoptedContext } from "./App";
import { useNavigate } from "react-router-dom";
function Details() {
  const param = useParams();
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { setAdoptedPet } = useContext(AdoptedContext);
  const navigate = useNavigate();

  //   `http://pets-v2.dev-apis.com/pets?id=${id}`;

  useEffect(() => {
    async function callPet() {
      const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?id=${param.id}`
      );
      const data = await res.json();
      //console.log(data.pets);
      setData(data.pets.at(0));
      // console.log(data.pets.at(0));
    }
    callPet();
  }, [param.id]);

  if (!data.name) {
    return (
      <div>
        <h2>Loading.....</h2>
      </div>
    );
  }

  return (
    <div className="details">
      <Carousel images={data.images} />
      <div>
        <h1>{data.name}</h1>
        <h2>{`${data.animal} — ${data.breed} — ${data.city}, ${data.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {data.name}</button>
        <p>{data.description}</p>
      </div>
      {showModal ? (
        <Modal>
          <div>
            <h1>Would you like to adopt {data.name}?</h1>
            <div className="buttons">
              <button
                onClick={() => {
                  setAdoptedPet(data);
                  navigate("/");
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

// Error boundary catches the error in the components and in the children of
// it as well and gives us fall back UI instead of crashing the app

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
