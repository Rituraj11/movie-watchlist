import { Row, Typography, Input, Card } from "antd";


const { Title } = Typography;
const { Search } = Input;
const { Meta } = Card;

const Home = () => {
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

            <Row className="w-full flex flex-col gap-y-4">
                <Row className="w-full">
                    <Search
                        placeholder="Search movies..."
                        allowClear
                        enterButton="Search"
                        size="large"
                        // onSearch={onSearch}
                    />
                </Row>
                <Row className="w-full gap-4">
                    <Card
                        hoverable
                        style={{
                            width: 150,
                        }}
                        cover={
                            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                        }
                    >
                        <Meta className="movie-card-content" title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Row>
            </Row>
        </Row>
    )
}

export default Home;