
const getItem = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
}

const setItem = (key, value) => {
    const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
    return localStorage.setItem(key, stringify);
}

const removeItem = (key) => {
    localStorage.removeItem(key);
}

export { getItem, setItem, removeItem } ;
