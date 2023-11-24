import { useEffect } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children }) {
  const elRef = useRef(null);

  // Ref would create a div and gives the same div on every re-render.

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalContainer = document.getElementById("modal");
    modalContainer.appendChild(elRef.current);

    return () => modalContainer.removeChild(elRef.current);
  }, []); // only want to do it once d'not want to append it again and again
  return createPortal(<div>{children}</div>, elRef.current);
}

export default Modal;
