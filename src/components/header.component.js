import React, { useState, useEffect } from 'react';
import { Col, Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import config from '../config';

const axios = require('axios');

const visible = window.location.href.indexOf('/login') === -1 && window.location.href.indexOf('/sign-up') === -1;
const menu = !visible ? ''
    : <li class='dropdown secondary-menu' role='none'>
        <ul class='list-unstyled dropdown-menu-subnav' role='menu' aria-label='Browse'>
            <li role='none'><a href='/list-teacher?major=math'
                target='_self' role='menuitem'> Toán <up-track tracking-event='click'
                    tracking-location-default='vs' tracking-sublocation='subnavigation_bar'
                    tracking-label='web_dev_link'
                    tracking-data='{&quot;nav_category&quot;: &quot;Web Dev&quot;}' class='hydrated'></up-track>
            </a></li>
            <li role='none'><a
                href='/list-teacher?major=physics' target='_self' role='menuitem'> Vật Lý <up-track tracking-event='click' tracking-location-default='vs'
                    tracking-sublocation='subnavigation_bar' tracking-label='mobile_dev_link'
                    tracking-data='{&quot;nav_category&quot;: &quot;Mobile Dev&quot;}' class='hydrated'>
                </up-track></a></li>
            <li role='none'><a href='/list-teacher?major=chemistry'
                target='_self' role='menuitem'> Hóa Học <up-track tracking-event='click'
                    tracking-location-default='vs' tracking-sublocation='subnavigation_bar'
                    tracking-label='design_link' tracking-data='{&quot;nav_category&quot;: &quot;Design&quot;}'
                    class='hydrated'></up-track></a></li>
            <li role='none'><a href='list-teacher?major=literature'
                target='_self' role='menuitem'> Ngữ Văn <up-track tracking-event='click'
                    tracking-location-default='vs' tracking-sublocation='subnavigation_bar'
                    tracking-label='writing_link'
                    tracking-data='{&quot;nav_category&quot;: &quot;Writing&quot;}' class='hydrated'></up-track>
            </a></li>
            <li role='none'><a href='/list-teacher?major=it' target='_self' role='menuitem'>
                Tin Học <up-track tracking-event='click' tracking-location-default='vs'
                    tracking-sublocation='subnavigation_bar' tracking-label='admin_support_link'
                    tracking-data='{&quot;nav_category&quot;: &quot;Admin Support&quot;}' class='hydrated'>
                </up-track></a></li>
            <li role='none'><a href='/list-teacher?major=geography' target='_self' role='menuitem'> Địa Lý <up-track tracking-event='click' tracking-location-default='vs'
                tracking-sublocation='subnavigation_bar' tracking-label='customer_service_link'
                tracking-data='{&quot;nav_category&quot;: &quot;Customer Service&quot;}' class='hydrated'>
            </up-track></a></li>
            <li role='none'><a href='/list-teacher?major=history'
                target='_self' role='menuitem'> Lịch Sử <up-track tracking-event='click'
                    tracking-location-default='vs' tracking-sublocation='subnavigation_bar'
                    tracking-label='marketing_link'
                    tracking-data='{&quot;nav_category&quot;: &quot;Marketing&quot;}' class='hydrated'>
                </up-track></a></li>
            <li role='none'><a href='/list-teacher?major=english' target='_self' role='menuitem'>
                Tiếng Anh <up-track tracking-event='click' tracking-location-default='vs'
                    tracking-sublocation='subnavigation_bar' tracking-label='accounting_link'
                    tracking-data='{&quot;nav_category&quot;: &quot;Accounting&quot;}' class='hydrated'>
                </up-track></a></li>
            <li role='none'><a href='/list-teacher?major=all' target='_self'
                role='menuitem'> <b>Tất cả chuyên môn</b> <up-track tracking-event='click'
                    tracking-location-default='vs' tracking-sublocation='subnavigation_bar'
                    tracking-label='view_all_categories_link'
                    tracking-data='{&quot;category&quot;: &quot;See All Categories&quot;}' class='hydrated'>
                </up-track></a></li>
        </ul>
    </li>;

function getStyleAvatar(url) {
    return {
        "background-image": "url('" + url + "')"
    }
}

export default function Header() {

    const [logged, setLogged] = useState(false);
    const [info, setInfo] = useState('');

    // for upload image
    const [uploadPercent, setUploadPercent] = useState('');
    const [fileImage, setFileImage] = useState('');
    const [avatarStyle, setAvatarStyle] = useState(getStyleAvatar('https://www.songthuanchay.vn/wp-content/uploads/2019/04/a-avatar-0.jpg'));

    // for dialog modal
    const [show, setShow] = useState(false);

    useEffect(() => {
        // check if have token or not
        const token = localStorage.getItem('token');

        // if have, check if it is still valid
        if (token != null) {
            axios.get(config['server-domain'] + 'profile/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setLogged(true);
                        setInfo(res.data);
                        if (res.data.avatar) {
                            setAvatarStyle(getStyleAvatar(res.data.avatar));
                        }
                    }
                })
                .catch(err => {
                    if (err.response) {
                        setLogged(false);
                    }
                })
        }
        else {
            console.log('There is no token in local storage');
        }
    }, []);

    return (
        <div id='layout'>
            <div data-o-smf='' data-o-smf-location='very_top'></div>
            <up-header-visitor-primary-nav class='hydrated'>
                <nav class='navbar navbar-fixed-top' aria-label='Navigation bar'>
                    <div class='container-visitor'>
                        <div class='navbar-header'>
                            <up-header-offcanvas-toggle class='hydrated'>
                                <button class='navbar-toggle d-lg-none' type='button'
                                    aria-controls='visitor-nav'><span class='sr-only'>Toggle navigation</span><span
                                        class='glyphicon glyphicon-md m-0 air-icon-view-as-informative text-muted vertical-align-middle'
                                        aria-hidden='true'></span>
                                    <up-track tracking-event='click' tracking-location-default='vs' tracking-sublocation='mobile_nav'
                                        tracking-label='expand_nav' class='hydrated'></up-track>
                                </button>
                            </up-header-offcanvas-toggle>
                            <a data-link-id='home_logo' class='navbar-brand' href='/' target='_self'> Get a tutor </a>
                            <div class='d-lg-none navbar-search navbar-search-mobile'>
                                <up-track tracking-event='mobileTopSearchOpen' tracking-event-alias='click'
                                    tracking-location-default='vs' tracking-sublocation='mobile_nav' tracking-label='search'
                                    class='hydrated'>
                                </up-track>
                                <up-header-search class='hydrated' mobile-top-search=''>
                                    <up-c-on-click-outside class='hydrated'>
                                        <form class='d-lg-none' method='GET' action='https://www.upwork.com/search/profiles/'
                                            role='search'>
                                            <up-track class='search-tracking hydrated' tracking-event='submit' tracking-event-alias='enter'
                                                tracking-location-default='vs' tracking-sublocation='mobile_nav' tracking-label='fl_search'>
                                            </up-track>
                                        </form>
                                    </up-c-on-click-outside>
                                </up-header-search>
                            </div>
                        </div>
                        <div class='navbar-collapse d-none d-lg-flex sticky-sublocation'>
                            <div class='navbar-form'>
                                <up-header-search class='hydrated'>
                                    <up-c-on-click-outside class='hydrated'>
                                        <form method='GET' action='/search/profiles/' role='search'>
                                            <up-track class='search-tracking hydrated' tracking-event='submit' tracking-event-alias='enter'
                                                tracking-location-default='vs' tracking-sublocation='primary_nav_bar'
                                                tracking-label='fl_search'></up-track>
                                            <div class='input-group input-group-search-dropdown input-group-navbar'>
                                                <div class='input-group-btn'><button class='btn p-0-left-right' type='submit'
                                                    tabindex='0'><span class='glyphicon air-icon-search m-sm-left m-0-right'
                                                        aria-hidden='true'></span><span class='sr-only'>Submit search</span></button><button
                                                            class='dropdown-toggle btn p-xs-left-right' type='button' tabindex='0'>
                                                        <up-track tracking-event='click' tracking-location-default='vs'
                                                            tracking-sublocation='primary_nav_bar' tracking-label='fl_job_search_dropdown'
                                                            class='hydrated'></up-track><span class='caret glyphicon air-icon-arrow-expand'
                                                                aria-hidden='true'></span><span class='sr-only'>Switch search source</span>
                                                    </button>
                                                    <up-header-search-menu tracking-sublocation='primary_nav_bar'
                                                        items-json='[{&quot;label&quot;:&quot;Jobs&quot;,&quot;url&quot;:&quot;\/search\/jobs\/&quot;,&quot;placeholder&quot;:&quot;Find Jobs&quot;,&quot;selected&quot;:false,&quot;trackingAttrs&quot;:{&quot;tracking-location-default&quot;:&quot;vs&quot;,&quot;tracking-label&quot;:&quot;job_search_from_dropdown&quot;},&quot;searchLabel&quot;:&quot;job_search&quot;},{&quot;label&quot;:&quot;Freelancers &amp; hợp đồng&quot;,&quot;url&quot;:&quot;\/search\/profiles\/&quot;,&quot;placeholder&quot;:&quot;Tìm giảng viên &amp; hợp đồng&quot;,&quot;selected&quot;:true,&quot;trackingAttrs&quot;:{&quot;tracking-location-default&quot;:&quot;vs&quot;,&quot;tracking-label&quot;:&quot;fl_search_from_dropdown&quot;},&quot;searchLabel&quot;:&quot;fl_search&quot;}]'
                                                        class='sc-up-header-search-menu-h sc-up-header-search-menu-s hydrated'>
                                                        <ul class='dropdown-menu sc-up-header-search-menu' role='menu'>
                                                            <li role='none' class='active sc-up-header-search-menu'>
                                                                <up-track tracking-event='click' tracking-location-default='vs'
                                                                    tracking-sublocation='primary_nav_bar' tracking-label='fl_search_from_dropdown'
                                                                    class='sc-up-header-search-menu hydrated'></up-track>Freelancers &amp; hợp đồng</li>
                                                            <li role='none' class='sc-up-header-search-menu'><up-track tracking-event='click' tracking-location-default='vs'
                                                                tracking-sublocation='primary_nav_bar' tracking-label='job_search_from_dropdown'
                                                                class='sc-up-header-search-menu hydrated'></up-track>Jobs</li>
                                                        </ul>
                                                    </up-header-search-menu>
                                                </div><input type='hidden' name='nbs' value='1' /><input class='form-control' type='search'
                                                    name='q' tabindex='0' placeholder='Tìm giảng viên &amp; hợp đồng' />
                                            </div>
                                        </form>
                                    </up-c-on-click-outside>
                                </up-header-search>
                            </div>
                            <ul class='navbar-nav navbar-lg navbar-subnav navbar-right' role='menubar'>
                                <li role='none'>
                                    <a href='list-teacher' target='_self' role='menuitem'><b><u>{!logged ? 'GUEST' : info.role === 'teacher' ? 'TEACHER' : 'STUDENT'}</u></b></a>
                                </li>
                                {menu}
                            </ul>
                            <div class='navbar-cta'><a class='btn btn-primary' href={!logged ? '/login' : info.role === 'teacher' ? '/create-constract' : '/find-constract'}>
                                {!logged ? 'ĐĂNG NHẬP' : info.role === 'teacher' ? 'TẠO HỢP ĐỒNG' : 'TÌM GIẢNG VIÊN'} <up-track tracking-event='click'
                                    tracking-location-default='vs' tracking-sublocation='primary_nav_bar'
                                    tracking-label='post_a_job_button' class='hydrated'></up-track></a>
                            </div>
                            <DropdownButton title={(logged ? info.fullname : 'ĐĂNG KÝ') + ' '} size="sm" className="dropbutton">
                                <Dropdown.Item href={logged ? '/info-teacher' : '/sign-up-teacher'}>{logged ? 'Cập nhật thông tin' : 'Đăng ký dạy học'}</Dropdown.Item>
                                <Dropdown.Item href={logged ? '/manage-tags' : '/sign-up-student'}>{logged ? 'Quản lý kỹ năng' : 'Đăng ký học'}</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href={logged ? '/logout' : '/forgot-pass'}>{logged ? 'Đăng xuất' : 'Quên mật khẩu'}</Dropdown.Item>
                            </DropdownButton>
                            {
                                !logged ? '' : <Col xs={1} md={1}>
                                    <div className="ratio img-responsive img-circle" style={avatarStyle} onClick={() => handleChangeAvatar()}></div>
                                </Col>
                            }
                        </div>
                    </div>
                </nav>
            </up-header-visitor-primary-nav>
            <Modal show={show} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật ảnh đại diện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" onChange={(e) => setFileImage(e.target.files[0])} ></input>
                    <center>
                        <Col xs={5} md={5}>
                            <div className="ratio img-responsive img-circle" style={avatarStyle} onClick={() => handleChangeAvatar()}></div><br></br>
                        </Col>
                    </center>
                    <progress className="progress" value={uploadPercent} max="100"></progress>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={(e) => handleUploadAvatar(e)}>Upload</Button>
                    <Button variant="primary" onClick={() => setShow(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

    function handleChangeAvatar() {
        setShow(true);
    }

    function handleUploadAvatar(e) {
        if (fileImage === '') {
            return;
        }

        var button = e.target;
        button.disabled = true;

        const fd = new FormData();
        fd.append('image', fileImage, info.email + '.png');
        axios.post('https://us-central1-webnc-1612422.cloudfunctions.net/uploadFile', fd, {
            onUploadProgress: progressEvent => {
                if (progressEvent.loaded < progressEvent.total) {
                    setUploadPercent(Math.floor(100 * progressEvent.loaded / progressEvent.total));
                }
                else {
                    setUploadPercent(100);
                }
            }
        })
            .then(function (res) {
                console.log(res);
                button.value = "Upload";
                button.disabled = false;
                getAvatar();
                // eslint-disable-next-line
            }.bind(this)).catch(function (err) {
                console.log(err);
                button.value = "Lỗi";
                // eslint-disable-next-line
            }.bind(this));
    }

    function getAvatar() {
        var imgUrl = 'https://firebasestorage.googleapis.com/v0/b/webnc-1612422.appspot.com/o/' + info.email + '.png';
        axios.get(imgUrl).then(res => {
            if (res && res.data) {
                var fullUrl = imgUrl + '?alt=media&token=' + res.data.downloadTokens;
                setAvatarStyle(getStyleAvatar(fullUrl));
                saveAvatarToServer(fullUrl);
            }
            else {
                console.log(res);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    function saveAvatarToServer(fullUrl) {
        const token = localStorage.getItem('token');
        axios.post(config['server-domain'] + 'profile/avatar', {
            email: info.email,
            avatar: fullUrl
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => { })
            .catch(err => { });
    }
}