import * as Clipboard from "expo-clipboard";
import { useToast } from "../contexts/ToastProvider";
import { useEffect, useState } from "react";

export const useCopyToClipboard = () => {
  const { show } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return {
    async copyToClipboard(text: string, successMessage?: string) {
      try {
        if (!copied) {
          await Clipboard.setStringAsync(text);
          setCopied(true);

          if (successMessage) {
            show({
              message: successMessage,
              type: "info",
            });
          }
        }
      } catch (e) {}
    },
    copied,
  };
};
