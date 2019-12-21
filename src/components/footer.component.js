import React, { useState, useEffect } from "react";
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { Widget, addResponseMessage, setQuickButtons } from 'react-chat-widget';

export default function Footer() {

    // for dialog modal
    const [show, setShow] = useState(false);
    const [listFriends, setListFriends] = useState([]);
    const [listFriendsHTML, setListFriendsHTML] = useState([]);

    const [friendName, setFriendName] = useState('');

    setQuickButtons([{
        "label": "Danh sách bạn bè",
        "value": "chat-history"
    }]);

    useEffect(() => {
        const fromServer = ['Trịnh Quang Nghĩa', 'Trần Bá Ngọc', 'Đặng Hoài Nam']
        setListFriends(fromServer);
        handleFindFriend('', fromServer);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div class='container-visitor'>
                <div class="vs-dash "></div>
            </div>
            <br></br><br></br><br></br>
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
                                                className="fa fa-facebook"></span></a></li>
                                        <li class="m-0-bottom p-0-right"><a href="/" target="_blank"
                                            title="Visit us on LinkedIn"><span
                                                className="fa fa-linkedin"></span></a></li>
                                        <li class="m-0-bottom p-0-right"><a href="/" target="_blank"
                                            title="Visit us on Twitter"><span
                                                className="fa fa-twitter"></span></a></li>
                                        <li class="m-0-bottom p-0-right"><a href="/"
                                            target="_blank" title="Visit us on YouTube"><span
                                                className="fa fa-youtube"></span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="footer-social-icons footer-download">
                                    <h2 class="m-0-bottom">Video hướng dẫn</h2>
                                    <ul class="list-inline">
                                        <li class="m-0-bottom p-0-right"><a
                                            href="/" target="_blank"
                                            title="Download Upwork app from Itunes"><span class="fa fa-film"></span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="text-center m-lg-top-bottom"><small>© 2020 Uber 4 Tutor | 1612422 - 1612431</small></p>
                </div>
            </footer>
            <Modal show={show} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách bạn bè</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="list filtered-list">
                        <input className="filter form-control" onInput={(e) => handleFindFriend(e.target.value)} type="text" placeholder="Tìm kiếm..." />
                    </div>
                    <ListGroup className='list-friends'>
                        {listFriendsHTML}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
            <Widget
                handleNewUserMessage={(newMessage) => { addResponseMessage(newMessage); }}
                title={friendName}
                subtitle=''
                handleQuickButtonClicked={(value) => setShow(true)}
            />
        </div>
    );

    function setChatTarget(name) {
        setFriendName(name);
        setShow(false);
    }

    function handleFindFriend(wildcat, src) {

        let html = [];
        src = src || listFriends;

        src.forEach(x => {
            if (wildcat === '' || x.indexOf(wildcat) !== -1) {
                html = html.concat(<ListGroup.Item action variant='success' onClick={() => setChatTarget(x)}>{x}</ListGroup.Item>)
            }
        })

        setListFriendsHTML(html);
    }
}