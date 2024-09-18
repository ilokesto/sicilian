const registOnChange = (setStore) => (e) => {
    // @ts-ignore
    setStore({ [e.target.name]: e.target.value });
};
export default registOnChange;
