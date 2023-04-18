import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openLoading, closeLoading } from "src/redux/reducers";


const Home = () => {
    const [items, setItems] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(openLoading());
        setTimeout(fetchaasa, 5000)
    }, [])

    useEffect(() => {
        console.log('item');
        //catch api here
    }, [items])

    const fetchaasa = () => {
        console.log('here');

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(result => {
                setItems(result);
            }).catch(() => { }).finally(() => { dispatch(closeLoading()) })
    }

    return (
        <>
            {items.map((e, index) => {
                return (
                    <div key={index}>{e.name}</div>
                )
            })
            }
        </>
    )
}

export default Home;