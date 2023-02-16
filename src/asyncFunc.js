export const wait = (time) => new Promise((resolve, reject) =>{
    setTimeout(()=>{
        try {
            resolve('Hello')
        } catch (error) {
            reject(error)
        }
    },time);
});

export const fetchData = async () =>{
    const res = fetch('https://jsonplaceholder.typicode.com/todos/1',);
    return res;
};

export default wait;
