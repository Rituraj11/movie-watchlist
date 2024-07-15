import { useSelector } from "react-redux";
import { Row, Typography } from "antd";
import UnAuthenticatedUserScreen from "../Others/UnAuthenticatedUserScreen";

const MyList = () => {
    const user = useSelector(state => state.auth.user);

    return(
        <Row className="w-full h-full flex flex-col gap-y-5">
            {
                !user ?
                    ( <UnAuthenticatedUserScreen />)
                :
                    (
                        <>
                            My Lists page
                        </>
                    )    
            }
            
        </Row>
    )
}

export default MyList;