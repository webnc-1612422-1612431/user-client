import React from "react";

const banner = <section data-qa-section="hero"
    class="d-flex align-items-center text-left homepage-hero admin hero-large hero-with-image-section">
    <div class="container-visitor py-10 mb-5">
        <div class="row">
            <div class="col-xs-12">
                <div class="row">
                    <h1 data-qa="title"
                        class="col-xs-10 col-sm-9 col-md-7 col-lg-6 col-xl-5 vs-color-white display-rebrand display-3 mb-0">
                        Tài năng bạn<br class="d-sm-none"></br> cần. <br class="d-none d-sm-block"></br>Để phát triển <br
                            class="d-sm-none"></br>bản thân. <small data-qa="subtitle"
                                class="clearfix pt-5 mt-10 d-none d-md-block"><b>Get a tutor</b> sẽ hỗ trợ bạn một cách tận tình để tìm cho mình một người giảng viên hơn cả mong đợi.</small></h1>
                </div>
                <div class="mobile-ctas d-flex d-md-none mt-20 mt-md-30"><a data-qa="cta"
                    class="mb-0 mr-0 btn btn-primary btn-sm" href="/cat"
                    track="" track-sublocation="hero" track-label="get_started_button" track-event="click"
                    event-registered="true"> Tìm giảng viên </a>
                    <div class="d-flex ml-md-5"><a data-qa="extra-cta" class="btn btn-default btn-sm m-0 ml-10"
                        target="_blank" href="/sign-up-student"
                        track="" track-sublocation="hero" track-label="get_a_demo_button" track-event="click"
                        event-registered="true"> Tạo tài khoản </a></div>
                </div>
                <div class="desktop-ctas d-none d-md-flex mt-20 mt-md-30"><a data-qa="cta"
                    class="mb-0 mr-0 btn btn-primary " href="/cat" track=""
                    track-sublocation="hero" track-label="get_started_button" track-event="click"
                    event-registered="true"> Tìm giảng viên </a>
                    <div class="d-flex ml-md-5"><a data-qa="extra-cta" class="btn btn-default m-0 ml-10" target="_blank"
                        href="/sign-up-student" track=""
                        track-sublocation="hero" track-label="get_a_demo_button" track-event="click"
                        event-registered="true"> Tạo tài khoản </a></div>
                </div>
            </div>
        </div>
    </div>
    <div class="bottom-freelancer-bar vs-color-white pb-10 ">
        <div class="container-visitor text-right pr-xl-60"><strong data-qa="brand-hero-name">Get a tutor</strong><small class="mx-5">|</small><small data-qa="brand-hero-position"><span
            class="d-none d-md-inline"></span>Mang đến sự hoàn hảo</small></div>
    </div>
</section>

const visible = window.location.href.indexOf(window.location.host) + window.location.host.length + 3 > window.location.href.length

export default function Banner() {
    return visible ? banner : "";
}