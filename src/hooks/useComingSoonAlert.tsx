import React, { useEffect, useState } from "react";
import { useToast } from "../contexts/ToastProvider";

export function useComingSoonAlert() {
  const { show } = useToast();

  const [canShow, setCanShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setCanShow(true);
      }, // 1 minute
      10000
    );

    return () => clearTimeout(timer);
  }, [canShow]);

  const showComingSoonAlert = () => {
    if (canShow) {
      show({
        message: "Coming soon!",
        type: "info",
      });
      setCanShow(false);
    }
  };

  return {
    showComingSoonAlert,
  };
}
