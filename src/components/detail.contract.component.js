import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import config from '../config';
import '../css/tags.css';

const axios = require('axios');
const token = localStorage.getItem('token');
var complainNotHandledExisted;

export default function DetailContract() {

    const [info, setInfo] = useState({});
    const [description, setDescription] = useState('');
    const [rate, setRate] = useState(0);
    const [state, setState] = useState(0);
    const [comment, setComment] = useState('');
    const [commentType, setCommentType] = useState('all');
    const [teacherView, setTeacherView] = useState('');
    const [avatarStyle, setAvatarStyle] = useState(getStyleAvatar());
    const [avatarStyle2, setAvatarStyle2] = useState(getStyleAvatar());
    const [commentHTML, setCommentHTML] = useState('');

    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [show2, setShow2] = useState(false);
    const [complain, setComplain] = useState('');

    useEffect(() => {
        if (!token) window.location.href = '/';

        const address = window.location.href;
        if (address.indexOf('?id=') !== -1) {
            var idParam = address.substr(address.indexOf('?id=') + '?id='.length);
            axios.get(config['server-domain'] + 'profile/detail-contract', {
                params: {
                    id: idParam
                }, headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.data && res.data.info) {
                        setInfo(res.data.info);
                        setAvatarStyle(getStyleAvatar(res.data.info.teacheravatar));
                        setAvatarStyle2(getStyleAvatar(res.data.info.studentavatar));
                        setDescription(res.data.info.description);
                        setRate(res.data.info.rate);
                        setState(res.data.info.state);
                        setTeacherView(res.data.isteacherview);
                        complainNotHandledExisted = res.data.complainNotHandledExisted;

                        // get comments
                        axios.post(config['server-domain'] + 'profile/get-comments', {
                            teacherid: res.data.info.teacherid
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then(ress => {
                                if (ress.data && ress.data.comments) {
                                    setupComments(ress.data.comments);
                                }
                            })
                            .catch(errr => { });
                    }
                })
                .catch(err => {
                    window.location.href = '/';
                })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, commentType, modalContent]);

    return (
        <div>
            <Card className='card-center'>
                <Card.Header className='card-header'>Các bên đại diện</Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={2}><div className='ratio img-responsive img-circle' style={avatarStyle}></div></Col>
                            <Col xs={4}>
                                <br></br>
                                Người dạy: <b><a href={'/detail-teacher?email=' + info.teacheremail}>{info.teachername}</a></b>&nbsp;
                                ({info.teacherage} tuổi)<br></br>
                                Bằng cấp: <b>{localizeDegree(info.teacherdegree)}</b><br></br>
                                Chuyên môn: <b>{localizeMajor(info.teachermajor)}</b><br></br>
                                Địa chỉ: <b>{info.teacheraddress}</b><br></br>
                                Email: <b>{info.teacheremail}</b><br></br>
                            </Col>
                            <Col xs={2}><div className='ratio img-responsive img-circle' style={avatarStyle2}></div></Col>
                            <Col xs={4}>
                                <br></br><br></br>
                                Người học: <b>{info.studentname}</b> ({info.studentage} tuổi)<br></br>
                                Địa chỉ: <b>{info.studentaddress}</b><br></br>
                                Email: <b>{info.studentemail}</b><br></br>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            <Card className='card-center'>
                <Card.Header className='card-header'>Thông tin hợp đồng</Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <label>Trạng thái:&nbsp;&nbsp;</label>{state === 0 ? 'Chưa hoàn thành' : state === 1 ? 'Đã hủy' : 'Đã hoàn thành'}<br></br><br></br>
                                <label>Môn học / kỹ năng:&nbsp;&nbsp;</label>{info.skill}<br></br><br></br>
                                <label>Giá toàn khóa:&nbsp;&nbsp;</label>{abbreviateNumber(info.revenue || 0)}<br></br><br></br>
                            </Col>
                            <Col>
                                <label>Ngày tạo:&nbsp;&nbsp;</label>{info.signeddate}<br></br><br></br>
                                <label>Ngày bắt đầu:&nbsp;&nbsp;</label>{info.startdate}<br></br><br></br>
                                <label>Ngày kết thúc:&nbsp;&nbsp;</label>{info.enddate}<br></br><br></br>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            <Card className='card-center' hidden={teacherView}>
                <Card.Header className='card-header'>Mô tả hợp đồng</Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <label>Đặt tên cho lớp học:</label>
                                <input className='form-control' style={{ width: '85%' }} value={description} onChange={(e) => setDescription(e.target.value)}></input>
                            </Col>
                            <Col>
                                <label>&nbsp;&nbsp;Đánh giá cho người dạy:</label><br></br>
                                <StarRatings
                                    rating={rate}
                                    starDimension='32px'
                                    starSpacing='1px'
                                    starRatedColor={rate < 3 ? 'red' : 'green'}
                                    changeRating={(i) => setRate(i)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <br></br><Button size="sm" onClick={() => updateContract()}>Lưu lại</Button>
                                <Button size="sm" variant='danger' onClick={() => updateContract(true)} disabled={state === 2}>Thanh toán</Button>
                            </Col>
                            <Col>
                                <br></br><Button size="sm" variant='danger' onClick={() => {
                                    if (complainNotHandledExisted) {
                                        setShow2(false);
                                        setModalContent('Bạn đã khiếu nại cho hợp đồng này và đang được xử lý, xin vui lòng đợi');
                                        setShow(true);
                                    } else {
                                        setShow2(true);
                                    }
                                }}>Khiếu nại người dạy</Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            <Card className='card-center' hidden={teacherView}>
                <Card.Header className='card-header'>Nhận xét người dạy</Card.Header>
                <Card.Body style={{ 'max-height': '250px', overflow: 'hidden', 'overflowY': 'scroll' }}>
                    <Container>
                        {commentHTML}
                    </Container>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col>
                            <label>Nhận xét cho người dạy:</label>
                            <input className='form-control' style={{ width: '85%' }} value={comment} onChange={(e) => setComment(e.target.value)}></input><br></br>
                            <Button size="sm" onClick={() => sendComment()} disabled={comment.trim().length === 0} >Gửi</Button>
                        </Col>
                        <Col>
                            <label>Hiển thị nhận xét:&nbsp;</label><br></br>
                            <select className='form-control-sm' style={{ height: '40px' }} defaultValue={commentType} onChange={(e) => setCommentType(e.target.value)}>
                                <option value='yourself'>Của bạn</option>
                                <option selected value='all'>Tất cả mọi người</option>
                            </select>
                        </Col>
                    </Row>
                </Card.Footer>
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
            <Modal show={show2} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Khiếu nại hợp đồng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Lý do khiếu nại:</label>
                    <textarea className='form-control' value={complain} onChange={(e) => setComplain(e.target.value)}></textarea><br></br>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => sendComplain()} variant='danger'>Xác nhận</Button>
                    <Button variant='primary' onClick={() => setShow2(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );

    function sendComplain() {
        axios.post(config['server-domain'] + 'profile/add-complain', {
            contractid: info.id,
            content: complain
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setShow2(false);
                    setModalContent(res.data.message);
                    setShow(true);
                }
            })
            .catch(err => {
                setShow2(false);
                setModalContent(err.response.data.message);
                setShow(true);
            });
    }

    function sendComment() {
        axios.post(config['server-domain'] + 'profile/add-comment', {
            teacherid: info.teacherid,
            studentid: info.studentid,
            content: comment
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setModalContent(res.data.message);
                    setShow(true);
                    setComment('');
                }
            })
            .catch(err => {
                setModalContent(err.response.data.message);
                setShow(true);
            });
    }

    function updateContract(paying) {
        axios.post(config['server-domain'] + 'profile/update-contract', {
            id: info.id,
            description: description,
            rate: rate,
            state: paying ? 2 : state
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    if (paying) {
                        setModalContent('Thanh toán thành công');
                        setShow(true);
                        setState(2);
                    }
                    else {
                        setModalContent(res.data.message);
                        setShow(true);
                    }
                }
            })
            .catch(err => {
                setModalContent(err.response.data.message);
                setShow(true);
            });
    }

    function getStyleAvatar(url) {
        if (url == null) {
            url = 'https://forum.waka.vn/assets/avatars/default.svg';
        }
        return {
            'background-image': 'url(\'' + url + '\')'
        }
    }

    function setupComments(comments) {
        const commentRows = [];

        // filter
        if (commentType !== 'all') {
            comments = comments.filter(x => x.fullname === info.studentname);
        }

        for (var i = 0; i < comments.length; i++) {
            commentRows.push(<Row>
                <Col xs={1}>
                    <div className='ratio img-responsive img-circle' style={getStyleAvatar(comments[i].avatar)}></div>
                </Col>
                <Col>
                    <b>{comments[i].fullname}</b>
                    <br></br>
                    <i>{comments[i].content}</i>
                </Col>
            </Row>);

            if (i !== comments.length - 1) {
                commentRows.push(<hr></hr>)
            }
        }

        if (comments.length === 0) {
            commentRows.push(<Row>Chưa có nhận xét nào cho người dạy</Row>);
        }
        setCommentHTML(commentRows);
    }
}

function abbreviateNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function localizeMajor(major) {
    switch (major) {
        case 'math': return 'Toán';
        case 'physics': return 'Vật Lý';
        case 'chemistry': return 'Hóa Học';
        case 'literature': return 'Ngữ Văn';
        case 'it': return 'Tin Học';
        case 'geography': return 'Địa Lý';
        case 'history': return 'Lịch Sử';
        case 'english': return 'Tiếng Anh';
        default: return '';
    }
}

function localizeDegree(degree) {
    switch (degree) {
        case 'university': return 'Đại Học';
        case 'master': return 'Thạc Sĩ';
        case 'doctor': return 'Tiến Sĩ';
        case 'professor': return 'Tiến Sĩ';
        default: return 'Cao Đẳng';
    }
}