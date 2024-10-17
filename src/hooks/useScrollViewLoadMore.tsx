export function useScrollViewLoadMore({
  isLoading,
  loadMore,
  hasNextPage,
}: {
  isLoading: boolean;
  loadMore: () => void;
  hasNextPage: boolean;
}) {
  const LOAD_MORE_THRESHOLD = 200;

  const handleScroll = ({
    nativeEvent,
  }: {
    nativeEvent: {
      layoutMeasurement: { height: number };
      contentOffset: { y: number };
      contentSize: { height: number };
    };
  }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const distanceToEnd =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (distanceToEnd < LOAD_MORE_THRESHOLD && !isLoading && hasNextPage) {
      loadMore();
    }
  };

  return {
    handleScroll,
  };
}
