import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { setIsModalOpen } from '../redux/slice/authSlice';
import AuthForm from './AuthForm';

const PopModal = () => {
    const dispatch = useDispatch();

    const isModalOpen = useSelector(state => state.auth.isModalOpen);
    const modalFormName = useSelector(state => state.auth.modalFormName);

    const handleOk = () => {
        dispatch(setIsModalOpen(false));
    };

    const handleCancel = () => {
        dispatch(setIsModalOpen(false));
    };

    return(
        <Modal 
            title={`${modalFormName} Form`}
            className='!w-5/12' 
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel} 
            footer={null}>
                
            <AuthForm formName={modalFormName} />
        </Modal>
    )
}

export default PopModal;