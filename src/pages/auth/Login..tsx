import {Button, Form, Input, notification} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import authBg from '../../assets/images/auth-bg.png';
import {useApiMutateMutation} from "../../service/Api.tsx";
import {useDispatch} from "react-redux";
import {setis_auth, setprofile_data} from "../../store/profile.tsx";
import {useNavigate} from "react-router-dom";

export default function Login() {
  const [mutate,{isLoading}] = useApiMutateMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onFinish = async (values: { email: string, password: string }) => {
    try {
      const res = await mutate({
        url: '/loginapi',
        method: 'POST',
        body: {
          email: values.email,
          password: values.password,
        }
      }).unwrap();
      console.log(res?.token);
      if (res?.token) {
        localStorage.setItem('token', res?.token);
        notification.success({
          message: 'Muvaffaqiyatli',
          description: 'Tizimga muvaffaqiyatli kirdingiz!',
        });
        dispatch(setis_auth({is_auth: true}));
        dispatch(setprofile_data(res?.user));
        navigate('/');
      } else {
        throw new Error("Token topilmadi");
      }

    } catch (error) {
      console.error("Login xatoligi:", error);
      notification.error({
        message: 'Xatolik',
        description: error?.data?.message || 'Login amalga oshmadi. Qayta urinib ko‘ring.',
      });
    }
  };


  return (
    <div
      className="min-h-screen flex justify-end bg-cover bg-center"
      style={{backgroundImage: `url(${authBg})`}}
    >
      {/* Chap taraf - shunchaki rasm bilan bo‘sh joy */}
      <div className="hidden w-full"></div>

      {/* O‘ng taraf - form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-none ">
        <div className="p-8 rounded-2xl shadow-xl w-full max-w-md bg-white">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 px-8 py-2 rounded-full text-gray-500 font-semibold">
              Logo
            </div>
          </div>
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">Tizimga kirish</h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Tizimga kirish uchun, login va parolni yozing
          </p>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Login"
              name="email"
              rules={[{required: true, message: 'Loginni kiriting!'}]}
            >
              <Input placeholder="Kiriting" size="large"/>
            </Form.Item>

            <Form.Item
              label="Parol"
              name="password"
              rules={[{required: true, message: 'Parolni kiriting!'}]}
            >
              <Input.Password
                size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
              />
            </Form.Item>

            <Form.Item>
              <Button loading={isLoading} type="primary" htmlType="submit" size="large" className="w-full">
                Tizimga kirish
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
