import { useEffect, useState } from "react";

const localCache = {};

function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setStatus("loading");
      setBreedList([]);
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const data = await res.json();
      setBreedList(data.breeds);
      localCache[animal] = data.breeds;
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}

export default useBreedList;
