import React,{useEffect} from "react";
import AuthLayout from "../../components/AuthLayout";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Layout,
  Input,
  Button,
  Checkbox,
  Tabs,
  Table,
  Image,
  Divider,
} from "antd";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { AUTH } from "../../config/constants";
import Logo from "../../assets/logo.png";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import swal from "sweetalert";
import { jwtDecode } from "jwt-decode";



// import router from "next/router";

function Signin() {
const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);
  const [tokenClient, setTokenClient] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  const CLIENT_ID = "500994605618-nk6h74l0lusqqpv2u0ajof31iqu5i71l.apps.googleusercontent.com";
  const SCOPES = "https://www.googleapis.com/auth/adsense https://www.googleapis.com/auth/adsense.readonly"


const createAccess = () => {
  tokenClient.requestAccessToken();
}

const handleCallbackResonse = (response) =>{
  console.log("Encoded JWT ID Token: " + response.credential)
  var userObject = jwtDecode(response.credential)
  console.log(userObject)

}

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:CLIENT_ID,
      callback: handleCallbackResonse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline", size:'large'}
    )

    setTokenClient(google.accounts.oauth2.initTokenClient({
      client_id:CLIENT_ID,
      scope: SCOPES,
      callback:async (tokenResponse) => {
        console.log(tokenResponse);
        

        if(tokenResponse && tokenResponse.access_token){
          onFinish(tokenResponse.access_token)
        }
      }
    }))


  }, [])
  



console.log(email)


  const onFinish =async (values) => {
 google.accounts.oauth2.initTokenClient({
      client_id:CLIENT_ID,
      scope: SCOPES,
      callback:async (tokenResponse) => {
        console.log(tokenResponse);
        

        if(tokenResponse && tokenResponse.access_token){

         let data = {
          email: values.email,
          password: values.password,
        };
        Post(AUTH.signin, data)
          .then((response) => {
            setLoading(false);
            console.log("response", response.data);
            if (response?.data?.status) {
              console.log("responsess", response.data?.data.user);
              dispatch(
                addUser({ user: response.data?.data?.user, token: response.data?.data.token,accessToken:tokenResponse.access_token})
              );
              navigate("/dashboard", { replace: true });
            } else {
              swal("Oops!", response.data.message, "error");
            }
          })
          .catch((e) => {
            console.log(":::;", e);
            setLoading(false);
          });


        }
      }}).requestAccessToken();
      
      
    setLoading(true);
  

 
  };
  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <AuthLayout
      head={{ title: "User Management", description: "Some Description." }}
    >
      <Layout style={{ backgroundColor: "#fff" }}>
        <Row
          style={{
            minHeight: "100vh",
            padding: "30px",
            justifyContent: "center",
          }}
        >
          <Col xs={24} md={20} lg={12} className="formMainWrap">
            <Row style={{ width: "100%", justifyContent: "center" }}>
              <Col xs={20} md={20} className="formWrap">
                <Row style={{ width: "100%", textAlign: "center" }}>
                  <Col xs={24} md={0}>
                    <Image
                      src={Logo}
                      style={{ maxWidth: "200px" }}
                      alt=""
                      preview={false}
                    />
                  </Col>
                  <Col xs={0} md={24}>
                    <Image
                      src={Logo}
                      style={{ maxWidth: "250px" }}
                      alt=""
                      preview={false}
                    />
                  </Col>
                </Row>
                
                <h4 className="auth-card-title">Sign in to your workspace</h4>
                <br />
                <Form
                  layout="vertical"
                  name="basic"
                  labelCol={{
                    span: 0,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please input valid Username!",
                        // warningOnly: true,
                      },
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Username"
                      style={{
                        borderRadius: "12px",
                        background: "white",
                        fontSize: "14px",
                        padding: "18px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        type: "string",
                        min: 8,
                        message: "password must be atleast 8 characters!",
                      },
                    ]}
                    style={{ marginBottom: "0" }}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter Password"
                      style={{
                        borderRadius: "12px",
                        background: "white",
                        fontSize: "14px",
                        padding: "18px 20px",
                      }}
                    />
                  </Form.Item>
                  <Row>
                    <Col xs={12} md={12}>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col xs={12} md={12}>
                      <Button
                        type="link"
                        style={{
                          float: "right",
                          color: "#21201E",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                        onClick={() => navigate("/forgot-password")}
                      >
                        Forgot Password?
                      </Button>
                    </Col>
                  </Row>
                  <br />

                  <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="web-btn"
                    style={{
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    {loading ? "Loading..." : "Continue"}
                  </Button>
                </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </AuthLayout>
  );
}

export default Signin;
