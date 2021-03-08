import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function useColumnQuery() {
  const showTwoCol = useMediaQuery("(min-width:300px) and (max-width:600px)");
  const showThreeCol = useMediaQuery("(min-width:600px) and (max-width:960px)");
  const showFiveCol = useMediaQuery("(min-width:960px)");

  const getColumns = () => {
    if (showFiveCol) {
      return 5;
    }
    if (showThreeCol) {
      return 3;
    }
    if (showTwoCol) {
      return 2;
    }

    return 1;
  };
  
  const columns = getColumns();
  
  return columns;
}
