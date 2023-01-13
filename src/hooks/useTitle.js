const { useEffect } = require("react");

const useTitle = (title) => {
  useEffect(() => {
    document.title = `Bike Valley - ${title}`;
  }, [title]);
};

export default useTitle;
