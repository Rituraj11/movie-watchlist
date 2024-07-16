import { useSelector } from "react-redux";
import { Row, Typography } from "antd";
import UnAuthenticatedUserScreen from "../Others/UnAuthenticatedUserScreen";
import SearchResultCard from "../../components/Home/SearchResultCard";

const { Title } = Typography;

const MyList = () => {
    const user = useSelector(state => state.auth.user);

    return(
        <Row className="w-full h-full flex flex-col gap-y-5">
            <Row className="w-full px-5 py-3 flex outline outline-1 outline-red-700 rounded-md">
                <Title level={2}>
                    Your <span className='text-red-500'>Watchlists</span>
                </Title>
            </Row>

            {
                user ?
                    <Row className="w-full gap-6">
                    {
                        user?.myWatchList.length > 0 ?
                            user?.myWatchList.map(item => {
                                return( <SearchResultCard key={item?.imdbID} item={item} />)
                            })
                        :
                            (
                                <>
                                    <Row className="w-full min-h-full h-auto flex justify-center">
                                        <Title level={4}>
                                            No movie in your watchlist !
                                        </Title>
                                    </Row> 
                                </>
                            )
                    }    
                    </Row>        
                    
                :
                    ( <UnAuthenticatedUserScreen />)  
            }
            
        </Row>
    )
}

export default MyList;