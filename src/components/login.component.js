import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Login extends Component {
    render() {
        return (
            <div>
                <form className="">
                    <h3>Đăng nhập</h3>

                    <div className="form-group">
                        <label>Địa chỉ E-mail</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Ghi nhớ đăng nhập</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
                    <p className="forgot-password text-right">
                        Quên <a href="forget-password"> mật khẩu?</a>
                    </p>
                </form>
            </div>
        );
    }
}