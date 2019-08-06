import { useEffect } from 'react';

function useDetectOutsideClick(ref, cb){

    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          cb();
        }
      }
    
      useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      });

}

export default useDetectOutsideClick;