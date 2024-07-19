import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import { updateUser } from "../../db/idb";
import bookMark from '../../assets/imgs/bookmark.png';
import bookMarked from '../../assets/imgs/bookmarked.png';
import { setUser } from "../../redux/slice/authSlice";

const { Meta } = Card;

const SearchResultCard = ({ item = {} }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ isBookmarked, setIsBookmarked ] = useState(false);
    const user = useSelector(state => state.auth.user);

    useEffect(() => { 
        if(user && user?.myWatchList.length > 0 && user?.myWatchList.some(obj => obj?.imdbID === item?.imdbID)){
            setIsBookmarked(true);
        }else{
            setIsBookmarked(false);
        }

        return () => {
            setIsBookmarked(false);
        }
    },[user, item])

    const handleBookmark = async() => {
        if(user){
            if(isBookmarked){
                const updatedList = user?.myWatchList.filter(obj => obj.imdbID !== item?.imdbID);

                const updatedUser = {
                    ...user,
                    myWatchList: updatedList,
                };

                dispatch(setUser(updatedUser))
                await updateUser(updatedUser);

            }else{
                const updatedUser = {
                    ...user,
                    myWatchList: [...user.myWatchList, item],
                };
                dispatch(setUser(updatedUser))
                await updateUser(updatedUser);
            }
        }
    }

    return(
        <Card
            hoverable
            style={{
                width: 150,
                zIndex: 1
            }}
            cover={
                <>
                    <img 
                        alt='Bookmark' 
                        src={isBookmarked ? bookMarked : bookMark} 
                        onClick={() => handleBookmark(item?.imdbID)}
                        style={{ 
                            width: '25px', 
                            position: 'absolute', 
                            marginTop: '4px',
                            zIndex: 3,
                            cursor: 'pointer'
                        }}
                    />
                    <img alt={item?.Title} src={item?.Poster} />
                </>
            }
        >
            <Meta 
                className="movie-card-content" 
                title={item?.Title} 
                style={{ zIndex: 1}}
                onClick={() => navigate(`/view/${item?.imdbID}`)}
                description={`${item?.Type} ${item?.Year}`} />
        </Card>
    )
}

export default SearchResultCard;