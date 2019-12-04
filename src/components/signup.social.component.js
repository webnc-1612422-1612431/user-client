import React, { useState, useEffect } from "react";

export default function SignUpSocial() {

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('teacher');

    useEffect(() => {
        const url = window.location.href;
        if (url.indexOf('fullname=') !== -1 && url.indexOf('email=')) {
            var start = url.indexOf('fullname=') + 9;
            var fullnamE = url.substr(start, url.indexOf('&') - start);
            setFullname(decodeURI(fullnamE));
            start = url.indexOf('email=') + 6;
            var emaiL = url.substr(start);
            if (url.indexOf('#') !== -1) {
                emaiL = url.substr(start, url.indexOf('#') - start);
            }
            setEmail(emaiL);
        }
        else {
            window.location.href = '/login';
        }
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        if (role.startsWith('teacher')) {
            window.location.href = '/sign-up-teacher?fullname=' + fullname + '&email=' + email;
        }
        else {
            window.location.href = '/sign-up-student?fullname=' + fullname + '&email=' + email;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <center><h3><b>ĐĂNG KÝ TÀI KHOẢN</b></h3></center>

            <div className='center'>
                <div className="form-group">
                    <label>Loại tài khoản</label>
                    <select className="form-control" onChange={(e) => setRole(e.target.value)} autoFocus>
                        <option value='teacher' selected>Giảng viên</option>
                        <option value='student'>Học viên</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Họ tên</label>
                    <input type="text" className="form-control" placeholder="" value={fullname} onChange={(e) => setFullname(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Địa chỉ E-mail</label>
                    <input type="email" className="form-control" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Tiếp tục</button>
                <p className="forgot-password text-right">
                    Đã có tài khoản? <a href="login">Đăng nhập?</a>
                </p>
            </div>
        </form>
    );
}