import React, { useState, useEffect } from 'react';
import config from '../config';

const axios = require('axios');

const menu = <li class='dropdown secondary-menu' role='none'>
    <ul class='list-unstyled dropdown-menu-subnav' role='menu' aria-label='Browse'>
        <li role='none'><a href='/cat/math'
            target='_self' role='menuitem'> Toán <up-track tracking-event='click'
                tracking-location-default='vs' tracking-sublocation='subnavigation_bar'
                tracking-label='web_dev_link'
                tracking-data='{&quot;nav_category&quot;: &quot;Web Dev&quot;}' class='hydrated'></up-track>
        </a></li>
        <li role='none'><a
            href='/cat/physics' target='_self' role='menuitem'> Vật Lý <up-track tracking-event='click' tracking-location-default='vs'
                tracking-sublocation='subnavigation_bar' tracking-label='mobile_dev_link'
                tracking-data='{&quot;nav_category&quot;: &quot;Mobile Dev&quot;}' class='hydrated'>
            </up-track></a></li>
        <li role='none'><a href='/cat/chemistry'
            target='_self' role='menuitem'> Hóa Học <up-track tracking-event='click'
                tracking-location-default='vs' tracking-sublocation='subnavigation_bar'
                tracking-label='design_link' tracking-data='{&quot;nav_category&quot;: &quot;Design&quot;}'
                class='hydrated'></up-track></a></li>
        <li role='none'><a href='cat/literature'
            target='_self' role='menuitem'> Ngữ Văn <up-track tracking-event='click'
                tracking-location-default='vs' tracking-sublocation='subnavigation_bar'
                tracking-label='writing_link'
                tracking-data='{&quot;nav_category&quot;: &quot;Writing&quot;}' class='hydrated'></up-track>
        </a></li>
        <li role='none'><a href='/cat/it' target='_self' role='menuitem'>
            Tin Học <up-track tracking-event='click' tracking-location-default='vs'
                tracking-sublocation='subnavigation_bar' tracking-label='admin_support_link'
                tracking-data='{&quot;nav_category&quot;: &quot;Admin Support&quot;}' class='hydrated'>
            </up-track></a></li>
        <li role='none'><a href='/cat/geography' target='_self' role='menuitem'> Địa Lý <up-track tracking-event='click' tracking-location-default='vs'
            tracking-sublocation='subnavigation_bar' tracking-label='customer_service_link'
            tracking-data='{&quot;nav_category&quot;: &quot;Customer Service&quot;}' class='hydrated'>
        </up-track></a></li>
        <li role='none'><a href='/cat/history'
            target='_self' role='menuitem'> Lịch Sử <up-track tracking-event='click'
                tracking-location-default='vs' tracking-sublocation='subnavigation_bar'
                tracking-label='marketing_link'
                tracking-data='{&quot;nav_category&quot;: &quot;Marketing&quot;}' class='hydrated'>
            </up-track></a></li>
        <li role='none'><a href='/cat/english' target='_self' role='menuitem'>
            Tiếng Anh <up-track tracking-event='click' tracking-location-default='vs'
                tracking-sublocation='subnavigation_bar' tracking-label='accounting_link'
                tracking-data='{&quot;nav_category&quot;: &quot;Accounting&quot;}' class='hydrated'>
            </up-track></a></li>
        <li role='none'><a href='/cat' target='_self'
            role='menuitem'> <b>Tất cả chuyên môn</b> <up-track tracking-event='click'
                tracking-location-default='vs' tracking-sublocation='subnavigation_bar'
                tracking-label='view_all_categories_link'
                tracking-data='{&quot;category&quot;: &quot;See All Categories&quot;}' class='hydrated'>
            </up-track></a></li>
    </ul>
</li>;

const visible = window.location.href.indexOf('/login') === -1 && window.location.href.indexOf('/sign-up') === -1;

export default function Header() {

    const [logged, setLogged] = useState(false);
    const [info, setInfo] = useState('');

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

                        // if this page is login or register, auto redirect to home
                        if (!visible) {
                            // window.location.href = '/';
                        }
                    }
                })
                .catch(err => {
                    if (err.response.data) {
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
                                <li role='none'><a href={logged ? '/profile' : '/sign-up-teacher'}
                                    target='_self' role='menuitem'> {logged ? <b>{info.fullname}</b> : 'ĐănG ký dạy'} <up-track tracking-event='click'
                                        tracking-location-default='vs' tracking-sublocation='primary_nav_bar'
                                        tracking-label='login_link' class='hydrated'></up-track></a></li>
                                <li role='none'><a href={logged ? '/logout' : '/sign-up-student'}
                                    target='_self' role='menuitem'> {logged ? 'Đăng xuất' : 'Đăng ký học'} <up-track tracking-event='click'
                                        tracking-location-default='vs' tracking-sublocation='primary_nav_bar'
                                        tracking-label='sign_up_link' class='hydrated'></up-track></a></li>
                                {visible ? menu : ''}
                            </ul>
                            <div class='navbar-cta'><a class='btn btn-primary' href={!logged ? '/login' : info.role === 'teacher' ? '/create-constract' : '/find-constract'}>
                                    {!logged ? 'ĐĂNG NHẬP' : info.role === 'teacher' ? 'TẠO HỢP ĐỒNG' : 'TÌM GIẢNG VIÊN'} <up-track tracking-event='click'
                                    tracking-location-default='vs' tracking-sublocation='primary_nav_bar'
                                    tracking-label='post_a_job_button' class='hydrated'></up-track></a>
                            </div>
                        </div>
                    </div>
                </nav>
            </up-header-visitor-primary-nav>
        </div>
    );
}