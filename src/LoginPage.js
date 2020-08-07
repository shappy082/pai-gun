import React from 'react'
import { Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Checkbox, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';



class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message: '',
            url: '',
            token: '',
            isLoggedIn: false,
        }

        // this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
     onFinish = values => {
        console.log('Received values of form: ', values);
        try {
             axios.post('http://alpha-api:8441/user/signin/',
                {
                    "password": values.password,
                    "username": values.username
                })
                .then(res => {
                    console.log(res.data)
                    console.log(res.data.message)
                    console.log(res.data.tokens)
                    
                    this.setState({
                        isLoggedIn: true,
                        token: res.data.tokens
                    })
                }).catch(function (error) {

                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                      } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                      } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                      }

                })
        } catch{
           
        }
    };
    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }

    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     this.setState({ isLoggedIn: false })
    //     const { username, password } = this.state

    //     const result = this.validateInput(username, password)
    //     if (result !== '') {
    //         this.setState({ message: result })
    //         return false
    //     }

    //     const encodepassword = btoa(unescape(encodeURIComponent(password)))
    //     userService
    //         .Login(username, encodepassword)
    //         .then(this.setLoginResult);
    // }

    // setLoginResult = (result) => {
    //     if (result.status === 'pass') {
    //         this.setState({ isLoggedIn: true })
    //         return true
    //         // store.set('loggedIn', true)
    //     }
    //     if (result.url !== undefined && result.url !== '') window.open(result.url)
    //     this.setState({ message: result.message })

    //     var msg = { severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: this.state.message };
    //     this.growl.show(msg);
    // }

    // validateInput = (username, password) => {
    //     if (username === '' && password === '') return 'กรุณากรอก Username และ Password'
    //     if (username === '') return 'กรุณากรอก Username'
    //     if (password === '') return 'กรุณากรอก Password'
    //     return ''
    // }

    render() {
        if (this.state.isLoggedIn) {
            sessionStorage.setItem('user', "test")
            return <Redirect to='/' />;
        }

        return (


            <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Form
                    name="normal_login"
                    className="login-form"
                    style={{ width: 300 }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}

                >
                    <img align="middle" src="logo3.png" />
                    <Form.Item
                        name="username"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
              </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" >
                            Log in
              </Button>
              Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </Row>
            // <div onClick={() => this.setState({ isLoggedIn: true })}>Login Page</div>
            // <div style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', height: "100%", width: "100%", overflow: "hidden" }}>
            //     <Growl ref={(el) => this.growl = el} />
            //     <div className="p-grid p-align-center vertical-container">
            //         <div className="p-col" />
            //         <div className="p-col">
            //             <div style={{ position: 'absolute', top: '50%', left: '50%', WebkitTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)' }}>
            //                 <Card style={{ width: '300px' }} className="p-card-shadow">
            //                     <form onSubmit={this.handleSubmit} autoComplete='off'>
            //                         <div className="p-grid p-fluid">
            //                             <div className="p-col-12 p-lg-12" align="center">
            //                                 <img src={BAACLogo} alt='BAAC logo' width='50' height='50' />
            //                                 <h1>Mini-Loan</h1>
            //                             </div>
            //                             <div className="p-col-12 p-lg-12">
            //                                 <label>Username</label>
            //                                 <InputText
            //                                     type='text'
            //                                     placeholder='รหัสพนักงาน'
            //                                     name='username'
            //                                     value={this.state.username}
            //                                     onChange={this.handleChange}
            //                                     required
            //                                 />
            //                             </div>
            //                             <div className="p-col-12 p-md-12">
            //                                 <label>Password</label>
            //                                 <InputText
            //                                     type='password'
            //                                     placeholder='รหัสผ่าน'
            //                                     name='password'
            //                                     value={this.state.password}
            //                                     onChange={this.handleChange}
            //                                     required
            //                                 />
            //                             </div>
            //                             <div className="p-col-12 p-md-12">
            //                                 <Button
            //                                     type="submit"
            //                                     label={"Login"}
            //                                 />
            //                             </div>
            //                             <div className="p-col">
            //                                 <a href={config.urlForgotPassword} align="left">ลืมรหัสผ่าน</a>
            //                             </div>
            //                             <div className="p-col">
            //                                 <a href={config.urlAbout}>
            //                                     <img src={logoIAuthen} width='45' height='45' alt="iAuthen" align="right" />
            //                                 </a>
            //                             </div>
            //                         </div>
            //                     </form >
            //                 </Card>
            //             </div>
            //         </div>
            //         <div className="p-col" />
            //     </div>
            // </div>

        )
    }
}

export default LoginPage