const { useEffect } = require("react")

const useTitle = title => {
    useEffect(() => {
        document.title = `Cell Swap - ${title}`;
    }, [title])
}

export default useTitle;