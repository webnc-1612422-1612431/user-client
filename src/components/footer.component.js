import React from "react";

export default function Footer() {
    return (
        <footer class="footer-visitor" role="contentinfo">
            <div class="container-visitor">
                <up-track tracking-event="impression" tracking-sublocation="footer" tracking-label="footer_section"
                    class="hydrated"></up-track>
                <up-footer-visitor-accordion
                    class="hydrated sc-up-footer-visitor-accordion-h sc-up-footer-visitor-accordion-s">
                </up-footer-visitor-accordion>
                <div class="footer-social">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="footer-social-icons">
                                <h2 class="m-0-bottom">Liên hệ chúng tôi</h2>
                                <ul class="list-inline">
                                    <li class="m-0-bottom p-0-right"><a href="/" target="_blank"
                                        title="Visit us on Facebook"><span
                                            class="glyphicon air-icon-social-facebook m-0"></span></a></li>
                                    <li class="m-0-bottom p-0-right"><a href="/" target="_blank"
                                        title="Visit us on LinkedIn"><span
                                            class="glyphicon air-icon-social-linkedin m-0"></span></a></li>
                                    <li class="m-0-bottom p-0-right"><a href="/" target="_blank"
                                        title="Visit us on Twitter"><span
                                            class="glyphicon air-icon-social-twitter m-0"></span></a></li>
                                    <li class="m-0-bottom p-0-right"><a href="/"
                                        target="_blank" title="Visit us on YouTube"><span
                                            class="glyphicon air-icon-social-youtube m-0"></span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="footer-social-icons footer-download">
                                <h2 class="m-0-bottom">Video hướng dẫn</h2>
                                <ul class="list-inline">
                                    <li class="m-0-bottom p-0-right"><a
                                        href="/" target="_blank"
                                        title="Download Upwork app from Itunes"><span class="glyphicon air-icon-apple m-0"></span></a>
                                    </li>
                                    <li class="m-0-bottom p-0-right"><a
                                        href="/" target="_blank"
                                        title="Download Upwork app from Google Play"><span
                                            class="glyphicon air-icon-android m-0"></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="text-center m-lg-top-bottom"><small>© 2020 Find a tutor | 1612422 - 1612431</small></p>
            </div>
        </footer>
    );
}