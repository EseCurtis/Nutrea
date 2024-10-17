import { useRef, useCallback } from "react";
import { FlatList } from "react-native";

const useScrollToTop = () => {
  const flatListRef = useRef<FlatList>(null);

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  return { flatListRef, scrollToTop };
};

export default useScrollToTop;
