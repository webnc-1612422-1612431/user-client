import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';

export default class SignUpStudent extends Component {
    render() {
        return (
            <form className="form-center">
                <br></br>
                <center><h3>Đăng ký người học</h3></center>
                <br></br>

                <div className="form-group">
                    <label>Họ tên</label>
                    <input type="text" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <label>Địa chỉ E-mail</label>
                    <input type="email" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <label>Nơi ở</label>
                    <input type="text" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <input type="password" className="form-control" placeholder="" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Đã có tài khoản? <a href="login">Đăng nhập?</a>
                </p>
            </form>
        );
    }
}