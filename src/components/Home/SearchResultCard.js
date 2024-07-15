import { Card } from "antd";
import bookMark from '../../assets/imgs/bookmark.png';
import bookMarked from '../../assets/imgs/bookmarked.png';

const { Meta } = Card;

const SearchResultCard = ({ item = {} }) => {
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
                        src={bookMark} 
                        onClick={() => console.log('------------Bookmark clicked------------')}
                        style={{ 
                            width: '25px', 
                            position: 'absolute', 
                            marginTop: '4px',
                            zIndex: 3
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
                onClick={() => console.log('------------Movie card clicked------------')}
                description={`${item?.Type} ${item?.Year}`} />
        </Card>
    )
}

export default SearchResultCard;