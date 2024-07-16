import { useDispatch } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { addUser, getUserByEmail } from '../db/idb';
import { setLoading, setUser, setAuthError, setIsModalOpen } from '../redux/slice/authSlice';
import { setItem } from '../utils/localStorageControl';

const AuthForm = ({ formName }) => {
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        dispatch(setLoading(true));

        if(values && values.email){
            const userData = await getUserByEmail(values?.email);
            if(formName === 'Register'){
            
                if(userData){
                    dispatch(setAuthError('User already exists'));
                    dispatch(setLoading(false));
                    // dispatch(setIsModalOpen(false))
                }else{
                    await addUser({...values, myWatchList: [] });
                    dispatch(setUser({...values, myWatchList: [] }));
                    setItem('user', {...values, myWatchList: [] })
                    dispatch(setLoading(false));
                    dispatch(setIsModalOpen(false))
                }
            }else{
                if(userData){
                    dispatch(setUser(userData));
                    setItem('user', userData)
                    dispatch(setLoading(false));
                    dispatch(setIsModalOpen(false))
                }else{
                    dispatch(setAuthError('User doesnot exists'));
                    dispatch(setLoading(false));
                }
            }
        }
    };

    return(
        <Form
            layout='vertical'
            className='w-full'                
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            {
                formName === 'Register' && <>
                    <Form.Item
                        label=""
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username',
                            },
                        ]}
                    >
                        <Input placeholder='Username' />
                    </Form.Item>
                </>
            }

            <Form.Item
                label=""
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email',
                    },
                    {
                        type: 'email',
                        message: 'The input is not valid email',
                    },
                ]}
            >
                <Input placeholder='Email' />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {formName}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AuthForm;