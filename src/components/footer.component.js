import React, { useState, useEffect } from "react";
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { Widget, addUserMessage, addResponseMessage, setQuickButtons, dropMessages, toggleWidget } from 'react-chat-widget';

// firebase section
import firebase from '../firebase';
const myEmail = localStorage.getItem('email');
var friendFromFirebase = [];
var currentRoom = {};

export default function Footer() {

    // for dialog modal
    const [show, setShow] = useState(false);
    const [listFriendsHTML, setListFriendsHTML] = useState([]);
    const [chatWith, setChatWith] = useState('Tin nhắn');
    const [badge, setBadge] = useState(0);

    // update badge
    setQuickButtons([{
        "label": "Tin nhắn từ bạn bè (" + badge + ")",
        "value": "chat-history"
    }, {
        "label": "Ẩn tin nhắn",
        "value": "chat-hide"
    }]);

    useEffect(() => {

        // get info from firebase
        firebase.database().ref().once('value', snap => {
            snap.forEach(childNode => {
                if (childNode.val() && childNode.val().metadata && childNode.val().metadata.u1 === myEmail) {
                    const box = {
                        peerEmail: childNode.val().metadata.u2,
                        messageId: childNode.key,
                        friendName: childNode.val().metadata.u2Name
                    };
                    friendFromFirebase.push(box);
                }
                else if (childNode.val() && childNode.val().metadata && childNode.val().metadata.u2 === myEmail) {
                    const box = {
                        peerEmail: childNode.val().metadata.u1,
                        messageId: childNode.key,
                        friendName: childNode.val().metadata.u1Name
                    };
                    friendFromFirebase.push(box);
                }
            });

            // detect new message
            firebase.database().ref().on('value', snap => {
                const listMessageId = friendFromFirebase.map(x => x.messageId);
                let badges = 0;
                snap.forEach(childNode => {
                    if (listMessageId.includes(childNode.key)) {
                        let friend = friendFromFirebase[listMessageId.indexOf(childNode.key)];
                        let count = 0;
                        firebase.database().ref().child(childNode.key).child('message')
                            .on('value', snap1 => {
                                snap1.forEach(childNode1 => {
                                    count++;
                                });
                            });
                        if (count > 0) {
                            let start = parseInt(localStorage.getItem(friend.messageId)) || 0;
                            friend.unread = count - start;
                            badges += friend.unread;
                        }
                    }
                });
                handleFindFriend(friendFromFirebase);
                setBadge(badges);
            });
        });

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
                        <input className="filter form-control" onInput={(e) => handleFindFriend(friendFromFirebase, e.target.value)} type="text" placeholder="Tìm kiếm..." />
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
                handleNewUserMessage={(newMessage) => { handleNewUserMessage(newMessage) }}
                title={chatWith}
                subtitle=''
                handleQuickButtonClicked={(value) => {
                    if (value === 'chat-history') {
                        setShow(true);
                    }
                    else {
                        currentRoom = {};
                        dropMessages();
                        setChatWith('Tin nhắn');
                        toggleWidget();
                    }
                }}
                badge={badge}
            />
        </div>
    );

    function chooseChatTarget(room) {

        currentRoom = room;

        // message listener
        firebase.database().ref().off('value');
        firebase.database().ref().on('value', snap => {
            const listMessageId = friendFromFirebase.map(x => x.messageId);
            let badges = badge;
            snap.forEach(childNode => {
                if (listMessageId.includes(childNode.key)) {
                    if (currentRoom.messageId === childNode.key) {
                        dropMessages();
                    }
                    let friend = friendFromFirebase[listMessageId.indexOf(childNode.key)];
                    let count = 0;
                    firebase.database().ref().child(childNode.key).child('message')
                        .on('value', snap1 => {
                            snap1.forEach(childNode1 => {
                                const message = {
                                    text: childNode1.val().text,
                                    time: childNode1.val().time,
                                    sender: childNode1.val().sender
                                };
                                if (currentRoom.messageId === childNode.key) {
                                    if (message.sender === myEmail) {
                                        addUserMessage(message.text);
                                    }
                                    else {
                                        addResponseMessage(message.text);
                                    }
                                }
                                else count++;
                            });
                        });

                    if (count > 0) {
                        let start = parseInt(localStorage.getItem(friend.messageId)) || 0;
                        friend.unread = count - start;
                        badges += friend.unread;
                    }
                }
            });
            handleFindFriend(friendFromFirebase);
            setBadge(badges);
        });

        const isRead = currentRoom.unread + parseInt(localStorage.getItem(currentRoom.messageId)) || 0;
        localStorage.setItem(currentRoom.messageId, parseInt(isRead) || 0);
        currentRoom.unread = 0;
        handleFindFriend(friendFromFirebase);
        setChatWith(currentRoom.friendName);
    }

    function handleNewUserMessage(message) {

        if (currentRoom.messageId == null) {
            addResponseMessage('Bạn đang nhắn tin với Bot');
        }
        else {
            firebase.database().ref(currentRoom.messageId).child('message').push()
                .set({
                    sender: myEmail,
                    text: message
                });

            // update message count
            var current = parseInt(localStorage.getItem(currentRoom.messageId)) || 0;
            localStorage.setItem(currentRoom.messageId, current + 1);
        }
    }

    function handleFindFriend(src, wildcat) {

        let html = [];
        wildcat = wildcat || '';

        src.forEach(room => {
            let friend = room.friendName || room.peerEmail;
            if (wildcat === '' || friend.indexOf(wildcat) !== -1) {
                var padding = room.unread ? (' (' + room.unread + ')') : '';
                html = html.concat(<ListGroup.Item action variant='success' onClick={() => chooseChatTarget(room)}>{friend}{padding}</ListGroup.Item>)
            }
        })

        setListFriendsHTML(html);
    }
}