/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { Layout as AntLayout, Menu, Row, Typography, Input, Col, Image, Dropdown, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { EllipsisOutlined, MenuUnfoldOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import userIcon from '../assets/imgs/user_icon.png';
import PopModal from '../components/PopModal';
import { setIsModalOpen, setModalFormName, setAuthError, setUser } from '../redux/slice/authSlice';
import { removeItem } from '../utils/localStorageControl';
import { setSearchTerm } from '../redux/slice/searchSlice';

const { Sider, Content, Header } = AntLayout;
const { Title } = Typography;
const { Search } = Input;


const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sideNavRef = useRef(null);
    const mainLayoutRef = useRef(null);

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
                    onClick={() => {
                        dispatch(setUser(null)); 
                        removeItem('user') ;
                        navigate('/')
                    }}
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

    const openNav = () => {
        if(sideNavRef && mainLayoutRef){
            sideNavRef.current.classList.remove('sideNav-inactive');
            sideNavRef.current.classList.add('sideNav-active');
    
            mainLayoutRef.current.classList.remove('main-active');
            mainLayoutRef.current.classList.add('main-inactive');
        }
    }

    const closeNav = () => {
        if(sideNavRef && mainLayoutRef){
            sideNavRef.current.classList.remove('sideNav-active');
            sideNavRef.current.classList.add('sideNav-inactive');
    
            mainLayoutRef.current.classList.remove('main-inactive');
            mainLayoutRef.current.classList.add('main-active');
        }
    }

    const handleMenuClick = () => {
        if(window.innerWidth < 599){
            closeNav()
        }
    }

    const handleSearch = (value) => {
        dispatch(setSearchTerm(value === '' ? null : value))
        if(window.innerWidth < 599){
            closeNav()
        }
    }

    return(
        <AntLayout className=' min-h-screen h-auto'>
            {contextHolder}
            <Sider ref={sideNavRef} id="sideNav" width={'25%'} className='sidenav !bg-white min-h-screen h-auto py-4 px-2' >
                <Row className='w-full bg-white justify-start'>
                    <Row className='w-full flex justify-between px-3'>

                        <Row className='bg-white'>
                            <Title level={2} className='!text-red-500'>Watchlists</Title>
                        </Row>
                        <Row className='flex sm:hidden' onClick={() => closeNav()}>
                            <ArrowLeftOutlined className='text-xl' />
                        </Row>
                    </Row>


                    <Menu mode="inline" defaultSelectedKeys={['1']} className='h-full'>
                        <Row className='bg-white justify-center px-1 py-3 mb-4'>
                            <Search placeholder="Search" onSearch={handleSearch}/>
                        </Row>
                        <Menu.Item key="1">
                            <Link to="/" onClick={handleMenuClick}>Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/mylist" onClick={handleMenuClick}>MyList</Link>
                        </Menu.Item>
                    </Menu>
                </Row>
                
                <Row className='w-full px-2'>
                    <Col span={4}><Image src={userIcon} width={25} height={25} /></Col>
                    <Col span={16}><Title level={5}>{user ? `${user?.username}` : 'Guest'}</Title></Col>
                    <Col span={4} className='flex justify-end'>
                        <Dropdown menu={{ items }}>
                            <EllipsisOutlined className='text-xl'  />
                        </Dropdown>
                    </Col>
                </Row>
            </Sider>
            <AntLayout ref={mainLayoutRef} id='main-layout' className='p-3 sm:p-6'>
                <Header
                    id='header'
                    className='flex sm:hidden'
                    style={{
                        padding: 0,
                        background: 'transparent',
                        height: 35,
                        lineHeight: 0
                    }}
                    >
                    <Button
                        type="text"
                        icon={<MenuUnfoldOutlined /> }
                        onClick={() => openNav()}
                        style={{
                            width: 64,
                        }}
                    />
                </Header>
                <Content id='main' className="min-w-screen h-auto p-3 sm:p-6">
                    {children}
                </Content>
            </AntLayout>
            <PopModal />
        </AntLayout>
    )
}

export default Layout;