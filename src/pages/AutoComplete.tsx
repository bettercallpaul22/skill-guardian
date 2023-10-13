import { useRef, useEffect } from "react";
// import "./styles.css";
const AutoComplete:React.FC = () => {
 const autoCompleteRef:any = useRef();
 const inputRef:any = useRef();

 useEffect(() => {
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
   inputRef.current,
   
  );
  autoCompleteRef.current.addListener("place_changed", async function () {
   const place = await autoCompleteRef.current.getPlace();
   console.log({ place });
  });
 }, []);


 
 return (
  <div>
   <label>enter address :</label>
   <input ref={inputRef} />
  </div>
 );
};
export default AutoComplete;