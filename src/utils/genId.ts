const genId = (() => {
    let id = -1;
    return () => {
        id += 1;
        return id.toString();
    };
})();

export default genId;
