import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import ShowMoreText from 'react-show-more-text';
import StarRatings from 'react-star-ratings';
import config from '../config';
import '../css/tags.css';

import firebase from '../firebase';

const axios = require('axios');
const myEmail = localStorage.getItem('email');
const myName = localStorage.getItem('name');

export default function DetailTeacher() {

    const [info, setInfo] = useState({});
    const [introduction, setIntroduction] = useState('');
    const [tags, setTags] = useState([]);
    const [avatarStyle, setAvatarStyle] = useState(getStyleAvatar('https://www.songthuanchay.vn/wp-content/uploads/2019/04/a-avatar-0.jpg'));

    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        const address = window.location.href;
        if (address.indexOf('?email=') !== -1) {
            var emailParams = address.substr(address.indexOf('?email=') + '?email='.length);
            axios.get(config['server-domain'] + 'public/get', {
                params: {
                    email: emailParams
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setInfo(res.data);
                        setIntroduction(res.data.introduction || '');
                        setTags(res.data.tags);
                        if (res.data.avatar) {
                            setAvatarStyle(getStyleAvatar(res.data.avatar));
                        }
                    }
                })
                .catch(err => {
                    window.location.href = '/';
                })
        }
    }, []);

    return (
        <div>
            <Card className="card-center">
                <Card.Header className="card-header">Thông tin</Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={2}><br></br><div className="ratio img-responsive img-circle" style={avatarStyle}></div></Col>
                            <Col xs={4}>
                                <br></br>
                                <b className="b-name">{info.fullname}</b><br></br>
                                Tuổi: <b>{info.age}</b><br></br>
                                Bằng cấp: <b>{info.degree}</b><br></br>
                                Địa chỉ: <b>{info.address}</b><br></br><br></br>
                                <Button size="sm" onClick={() => handleAddFriend()}>Kết bạn</Button>
                            </Col>
                            <Col>
                                <center>
                                    <br></br>
                                    <b>Đánh giá tổng quan</b><br></br>
                                    <StarRatings
                                        rating={4.5}
                                        starDimension="24px"
                                        starSpacing="1px"
                                        starRatedColor="green"
                                    /><br></br>
                                    <b>4.5/5 (Fake)</b><br></br>
                                </center>
                            </Col>
                        </Row>
                        <Row className="intro-container">
                            <Col>
                                <h3><b><u>TỰ GIỚI THIỆU</u></b></h3>
                                <p>
                                    <ShowMoreText
                                        lines={1}
                                        more=' - Xem thêm'
                                        less=' - Thu gọn'
                                        expanded={false}>
                                        {introduction.split('\n').map((line, i, arr) => {
                                            const lineHTML = <span key={i}>{line}</span>;
                                            if (i === arr.length - 1) {
                                                return lineHTML;
                                            } else {
                                                return [lineHTML, <br key={i + 'br'} />];
                                            }
                                        })}
                                    </ShowMoreText>
                                </p>
                            </Col>
                        </Row>
                        <Row className="intro-container">
                            <Col>
                                <b>{info.price} VND</b><br></br>
                                Giá trên giờ
                        </Col>
                            <Col>
                                <b>{info.countContracts}</b><br></br>
                                Số hợp đồng
                        </Col>
                            <Col>
                                <b>{info.totalRevenue} VND</b><br></br>
                                Tổng thu nhập
                        </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            <Card className="card-center">
                <Card.Header className="card-header">Kỹ năng</Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <ReactTags tags={tags} readOnly={true} />
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            <Card className="card-center">
                <Card.Header className="card-header">Đánh giá từ người học (Fake)</Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={1}>
                                <div className="ratio img-responsive img-circle" style={avatarStyle}></div>
                            </Col>
                            <Col>
                                <b>Trịnh Quang Nghĩa</b>
                                <br></br>
                                <i>Thầy giáo rất vui tính và nhiệt tình</i>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col xs={1}>
                                <div className="ratio img-responsive img-circle" style={avatarStyle}></div>
                            </Col>
                            <Col>
                                <b>Trần Bá Ngọc</b>
                                <br></br>
                                <i>Thầy hơi nghiêm túc nhưng dạy rất hay</i>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            <Modal show={show} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => setShow(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );

    function getStyleAvatar(url) {
        return {
            "background-image": "url('" + url + "')"
        }
    }

    function handleAddFriend() {

        if (myEmail === null || myName === null) {
            setModalContent('Xin vui lòng đăng nhập để tiếp tục');
            setShow(true);
            return;
        }

        firebase.database().ref().on('value', snap => {

            var isExisted = false;
            snap.forEach(childNode => {
                if ((childNode.val().metadata.u1 === myEmail && childNode.val().metadata.u2 === info.email) ||
                    (childNode.val().metadata.u1 === info.email && childNode.val().metadata.u2 === myEmail)) {
                    isExisted = true;
                    return;
                }
            });

            if (isExisted) {
                setModalContent('Hai bạn đã kết bạn với nhau');
                setShow(true);
            }
            else {
                firebase.database().ref().push()
                    .set({
                        metadata: {
                            u1: myEmail,
                            u2: info.email,
                            u1Name: myName,
                            u2Name: info.fullname
                        }
                    })
                    .then(id => {
                        setModalContent('Thêm bạn thành công');
                        setShow(true);
                    })
                    .catch(err => {
                        setModalContent('Lỗi: ' + JSON.stringify(err));
                        setShow(true);
                    })
            }
        });
    }
}