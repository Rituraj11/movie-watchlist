import { Card } from "antd";

const { Meta } = Card;

const SearchResultCard = ({ item = {} }) => {
    return(
        <Card
            hoverable
            style={{
                width: 150,
            }}
            cover={
                <img alt={item?.Title} src={item?.Poster} />
            }
        >
            <Meta 
                className="movie-card-content" 
                title={item?.Title} 
                description={`${item?.Type} ${item?.Year}`} />
        </Card>
    )
}

export default SearchResultCard;