/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Layout as AntLayout, Menu, Row, Typography, Input, Col, Image, Dropdown, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EllipsisOutlined } from '@ant-design/icons';
import userIcon from '../assets/imgs/user_icon.png';
import PopModal from '../components/PopModal';
import { setIsModalOpen, setModalFormName, setAuthError, setUser } from '../redux/slice/authSlice';

const { Sider, Content } = AntLayout;
const { Title } = Typography;
const { Search } = Input;


const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);
    const user = useSelector(state => state.auth.user);
    const [messageApi, contextHolder] = message.useMessage()

    const items = [
        {
          key: '1',
          label: (
            <Button 
                type="text" 
                className='bg-white' 
                style={{  display: !user ? 'block' : 'none' }}
                onClick={() => { dispatch(setModalFormName('Register')); dispatch(setIsModalOpen(true))}}
            >
                Register
            </Button>
          ),
        },
        {
          key: '2',
          label: (
            <Button 
                type="text" 
                className='bg-white' 
                style={{  display: !user ? 'block' : 'none' }}
                onClick={() => { dispatch(setModalFormName('Login')); dispatch(setIsModalOpen(true))}}
            >
                Login
            </Button>
          ),
        },
        {
            key: '3',
            label: (
              <Button 
                  type="text" 
                  style={{ display: user ? 'block' : 'none'}}
                  className='bg-white' 
                  onClick={() => dispatch(setUser(null))}
              >
                  Logout
              </Button>
            ),
        }
    ];

    const errorMsg = (err) => {
        messageApi.open({
          type: 'error',
          content: err,
        });
    };

    useEffect(()=>{
        if(error){
            errorMsg(error);
            dispatch(setAuthError(null))
        }
    },[error]);

    return(
        <AntLayout className=' min-h-screen h-auto'>
            {contextHolder}
            <Sider width={'25%'} className='!bg-white h-screen py-4 px-2' >
                <Row className='w-full bg-white justify-center'>
                    <Row className='bg-white'>
                        <Title level={2} className='!text-red-500'>Watchlists</Title>
                    </Row>

                    <Menu mode="inline" defaultSelectedKeys={['1']} className='h-full'>
                        <Row className='bg-white justify-center px-1 py-3 mb-4'>
                            <Search placeholder="Search" />
                        </Row>
                        <Menu.Item key="1">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/mylist">MyList</Link>
                        </Menu.Item>
                    </Menu>
                </Row>
                
                <Row className='w-full px-2'>
                    <Col span={4}><Image src={userIcon} width={25} height={25} /></Col>
                    <Col span={16}><Title level={5}>{user ? `${user?.username}` : 'Guest'}</Title></Col>
                    <Col span={4} className='flex justify-end'>
                        <Dropdown menu={{ items }}>
                            <EllipsisOutlined />
                        </Dropdown>
                    </Col>
                </Row>
            </Sider>
            <AntLayout style={{ padding: '0 24px 24px' }}>
                {/* <Header className="site-layout-background" style={{ padding: 0 }}>
                    Header
                </Header> */}
                <Content className="min-w-screen p-6">
                    {children}
                </Content>
            </AntLayout>
            <PopModal />
        </AntLayout>
    )
}

export default Layout;