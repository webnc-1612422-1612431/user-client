import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Đăng ký tài khoản người học</h3>

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