import { Button, Form, Input } from 'antd';

const AuthForm = ({ formName }) => {

    const onFinish = (values) => {
        console.log('Success:', values);
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