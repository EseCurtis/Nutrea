import { useEffect, useState } from "react";

export const useRemount = (dependencies: any[] = []) => {
    const [key, setKey] = useState(Math.random());
  
    useEffect(() => {
      setKey(Math.random());
    }, dependencies);
  
    return {
      key,
      remount: () => setKey(Math.random())
    };
  };