import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Typography, Input, Spin } from "antd";
import { searchMovies, setSearchResults, setSearchTerm } from "../../redux/slice/searchSlice";
import SearchResultCard from "../../components/Home/SearchResultCard";

const { Title } = Typography;
const { Search } = Input;

const Home = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state?.search?.loading);
    const searchResults = useSelector(state => state?.search?.searchResults);
    const searchTerm = useSelector(state => state?.search?.searchTerm);

    useEffect(()=>{
        dispatch(searchMovies(searchTerm));

        return () => {
            dispatch(setSearchResults(null))
        }
    },[searchTerm]);

    const handleSearch = (value) => {
        dispatch(setSearchTerm(value === '' ? null : value))
    }

    return(
        <Row className="w-full flex flex-col gap-y-5">
            <Row className="w-full p-5 flex flex-col outline outline-1 outline-red-700 rounded-md">
                <Title level={2} className="mb-4">
                    Welcome to <span className='text-red-500'>Watchlists</span>
                </Title>
                <Title level={5} className="!mt-0">
                    Browse movies, add them to watchlists and share with friends.
                </Title>
                <Title level={5} className="!mt-0">
                    Just click the + to add movie, the poster to see more details and mark the movie as watched.
                </Title>
            </Row>

            <Row className="w-full flex flex-col gap-y-5">
                <Row className="w-full">
                    <Search
                        placeholder="Search movies..."
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={handleSearch}
                    />
                </Row>
                <Row 
                    className="w-full gap-6"
                    style={{ justifyContent: loading ? 'center' : 'flex-start'}}
                    >
                    {
                        !loading && searchResults && searchResults.length > 0 ?
                        searchResults.map(item => {
                            return (<SearchResultCard key={item?.imdbID} item={item} />)
                        })
                        :
                            ( <Spin size="large" tip="Loading"  />)
                    }
                </Row>
            </Row>
        </Row>
    )
}

export default Home;