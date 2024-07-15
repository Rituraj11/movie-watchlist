import { Row, Typography } from "antd";

const { Title } = Typography;

const UnAuthenticatedUserScreen = () => {
    return(
        <Row className="w-full h-full flex justify-center items-center">
            <Title level={2}>Please Login</Title>
        </Row>
    )
}

export default UnAuthenticatedUserScreen;