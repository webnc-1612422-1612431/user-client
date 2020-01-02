import React from 'react';
import ListTeacher from './list.teacher.component';

var banner = <div><section data-qa-section='hero'
    class='d-flex align-items-center text-left homepage-hero admin hero-large hero-with-image-section banner'>
    <div class='container-visitor py-10 mb-5'>
        <div class='row'>
            <div class='col-xs-12'>
                <br></br>
                <div class='row'>
                    <h1 data-qa='title'
                        class='col-xs-10 col-sm-9 col-md-7 col-lg-6 col-xl-5 vs-color-white display-rebrand display-3 mb-0'>
                        Tài năng bạn<br class='d-sm-none'></br> cần <br class='d-none d-sm-block'></br>Sự tận tình bạn <br
                            class='d-sm-none'></br>muốn <small data-qa='subtitle'
                                class='clearfix pt-5 mt-10 d-none d-md-block'>
                            <b>Uber 4 Tutor</b> sẽ hỗ trợ bạn một cách nhiệt tình để tìm cho mình một người thầy hơn cả mong đợi.
                        </small></h1>
                </div>
                <div class='mobile-ctas d-flex d-md-none mt-20 mt-md-30'><a data-qa='cta'
                    class='mb-0 mr-0 btn btn-primary btn-sm' href='/list-teacher?major=all'
                    track='' track-sublocation='hero' track-label='get_started_button' track-event='click'
                    event-registered='true'> Tìm giảng viên </a>
                    <div class='d-flex ml-md-5'><a data-qa='extra-cta' class='btn btn-default btn-sm m-0 ml-10'
                        target='_blank' href='/request-contract'
                        track='' track-sublocation='hero' track-label='get_a_demo_button' track-event='click'
                        event-registered='true'> Tạo hợp đồng </a></div>
                </div>
                <div class='desktop-ctas d-none d-md-flex mt-20 mt-md-30'>
                    <a data-qa='cta'
                        class='mb-0 mr-0 btn btn-primary ' href='/list-teacher?major=all' track=''
                        track-sublocation='hero' track-label='get_started_button' track-event='click'
                        event-registered='true'> Tìm giảng viên </a>
                    <div class='d-flex ml-md-5'><a data-qa='extra-cta' class='btn btn-default m-0 ml-10' target='_blank'
                        href='/request-contract' track=''
                        track-sublocation='hero' track-label='get_a_demo_button' track-event='click'
                        event-registered='true'> Tạo hợp đồng </a></div>
                </div>
                <br></br>
            </div>
        </div>
    </div>
    <div class='bottom-freelancer-bar vs-color-white pb-10 '>
        <div class='container-visitor text-right pr-xl-60'>
            <strong data-qa='brand-hero-name'> Uber 4 Tutor</strong><small class='mx-5'>|</small><small data-qa='brand-hero-position'><span
                class='d-none d-md-inline'></span>Cầu nối cho tương lai vững bền</small>
        </div>
    </div><br></br>
</section>
    <section class='value-props-section m-xlg-top' data-qa-section='value-props' track='' track-sublocation='value_props'
        track-label='value_props_section' track-event='impression' event-registered='true'>
        <div class='container-visitor'>
            <div class='row'>
                <div data-qa='item' class='col-xs-12 col-md-4'>
                    <div class='m-xlg-bottom text-center'>
                        <img alt='intro-1'
                            data-src='https://assets.static-upwork.com/assets/Adquiro/d858f86/wp/images/proven-talent.587859ebad24.svg'
                            class='d-none d-md-inline lazyloaded' height='80' data-qa='image'
                            src='https://assets.static-upwork.com/assets/Adquiro/d858f86/wp/images/proven-talent.587859ebad24.svg'>
                        </img>
                        <h1 data-qa='title' class='text-canela vs-color-midnight-blue m-md-top-bottom'>Tài năng được kiểm chứng</h1>
                        <p data-qa='text' class='m-0 lead-intro'>Những người thầy tâm huyết nhất – được đánh giá từ hàng ngàn học viên.</p>
                    </div>
                </div>
                <div data-qa='item' class='col-xs-12 col-md-4'>
                    <div class='m-xlg-bottom text-center'>
                        <img alt='intro-2'
                            data-src='https://assets.static-upwork.com/assets/Adquiro/d858f86/wp/images/flexible-scope.07c26ebeb435.svg'
                            class='d-none d-md-inline ls-is-cached lazyloaded' height='80' data-qa='image'
                            src='https://assets.static-upwork.com/assets/Adquiro/d858f86/wp/images/flexible-scope.07c26ebeb435.svg'></img>
                        <h1 data-qa='title' class='text-canela vs-color-midnight-blue m-md-top-bottom'>Tất cả lĩnh vực</h1>
                        <p data-qa='text' class='m-0 lead-intro'>Từ thạc sĩ, tiến sĩ mọi chuyên ngành đến các chuyên gia hàng đầu</p>
                    </div>
                </div>
                <div data-qa='item' class='col-xs-12 col-md-4'>
                    <div class='m-xlg-bottom text-center'><img alt='intro-3'
                        data-src='https://assets.static-upwork.com/assets/Adquiro/d858f86/wp/images/enterprise-ready.c66e042c586a.svg'
                        class='d-none d-md-inline ls-is-cached lazyloaded' height='80' data-qa='image'
                        src='https://assets.static-upwork.com/assets/Adquiro/d858f86/wp/images/enterprise-ready.c66e042c586a.svg'></img>
                        <h1 data-qa='title' class='text-canela vs-color-midnight-blue m-md-top-bottom'>Chính sách hợp lý</h1>
                        <p data-qa='text' class='m-0 lead-intro'>Đội ngũ hỗ trợ tối đa, tận tâm, nhiệt tình</p>
                    </div>
                </div>
            </div>
            <div class='vs-dash'></div>
        </div>
    </section>
    <ListTeacher special='top-rate' />
</div>

const visible = window.location.href.indexOf(window.location.host) + window.location.host.length + 3 > window.location.href.length

export default function Banner() {
    return visible ? banner : '';
}