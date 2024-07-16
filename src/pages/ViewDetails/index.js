import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Image, Row, Spin, Typography } from "antd";
import { viewDetails, setSelectedViewDetails } from "../../redux/slice/searchSlice";

const { Title, Paragraph } = Typography;

const ViewDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const loading = useSelector(state => state.search.loading)
    const error = useSelector(state => state.search.error)
    const selectedViewDetails = useSelector(state => state.search.selectedViewDetails)

    useEffect(()=> {
        if(params?.id){
            dispatch(viewDetails(params?.id))
        }

        return () => {
            dispatch(setSelectedViewDetails(null))
        }
    },[params?.id]);

    console.log(selectedViewDetails)

    return(
        // <h1>details screen: {params?.id}</h1>
        <Row className="w-full gap-y-4">
            <Row className="w-full">
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </Row>

            {
                !loading ? 
                    !error?
                    (
                        <Row className="w-full gap-y-3">
                            <Row className="w-full">
                                <Col span={6}>
                                    <Image 
                                        src={selectedViewDetails?.Poster} 
                                        alt={selectedViewDetails?.Title}
                                        style={{ width: '80%'}}
                                        preview={false}  />
                                </Col>
                                <Col span={18}>
                                    <Title level={5}>
                                        Title: {selectedViewDetails?.Title}
                                    </Title>
                                    <Paragraph className="mb-0">
                                        Year: {selectedViewDetails?.Year}
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        Rated: {selectedViewDetails?.Rated}
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        Released: {selectedViewDetails?.Released}
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        Runtime: {selectedViewDetails?.Runtime}
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        Genre: {selectedViewDetails?.Genre}
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        Director: {selectedViewDetails?.Director}
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        Writer: {selectedViewDetails?.Writer}
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        Actors: {selectedViewDetails?.Actors}
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        Language: {selectedViewDetails?.Language}
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        Country: {selectedViewDetails?.Country}
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        ImdbRating: {selectedViewDetails?.imdbRating}
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        ImdbVotes : {selectedViewDetails?.imdbVotes} 
                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row className="w-full">
                                <Paragraph className="mb-0">
                                    Plot : {selectedViewDetails?.Plot} 
                                </Paragraph>
                                <Paragraph className="mb-0">
                                    Awards : {selectedViewDetails?.Awards} 
                                </Paragraph>

                            </Row>
                        </Row>
                    )
                    :
                    (<Title level={4}>Details Not Found...</Title>)
                :
                
                    (<Spin size="large" tip="Loading"  />)
            }


        </Row>
    );
}

export default ViewDetails;