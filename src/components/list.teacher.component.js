import React, { useState, useEffect } from "react";
import { Button, Pagination, Card, Col, Row, Container } from 'react-bootstrap';
import config from '../config';
import '../css/tags.css';

const axios = require('axios');
var teachersArray;

export default function ListTeacher() {

    const [listTeacherHTML, setListTeacherHTML] = useState('');

    if (window.location.href.indexOf('?major=') !== -1) {
        var major = window.location.href.substr(window.location.href.indexOf('?major=') + '?major='.length);
    }
    else {
        major = 'all';
    }

    useEffect(() => {
        axios.get(config['server-domain'] + 'public/all-teacher', {
            params: {
                major: major
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    teachersArray = res.data.teachers;
                    setupListTeacher(teachersArray);
                    setupPagination(teachersArray);
                }
            })
            .catch(err => {
                alert(err)
                window.location.href = '/';
            })
    }, [major]);

    return (
        <Card className="card-list">
            <Card.Header>
                Danh sách giáo viên <b>{localizeMajor(major)}</b>
                <div className="sort-list">
                    <i>...</i>
                </div>
            </Card.Header>
            <Container className="container-list">
                {listTeacherHTML}
            </Container>
            <Card.Footer>
                <center>
                    <Pagination>
                        {/* {paginationHTML} */}
                    </Pagination>
                </center>
            </Card.Footer>
        </Card>
    );

    function setupListTeacher(data) {
        var resultHTML = data.map((info, index) => {
            const avatarHTML = {
                "background-image": "url('" + info.avatar + "')"
            }
            return <Col>
                <Card className="card-small">
                    <Card.Header className="card-header">{info.fullname}</Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col xs={1}><div className="ratio img-responsive img-circle" style={avatarHTML}></div></Col>
                                <Col xs={8}>
                                    <b>{localizeDegree(info.degree)}</b><br></br>
                                    {info.address.substr(0, 25) + '...'}
                                    <br></br><br></br>
                                    <Button size="sm" href={'detail-teacher?email=' + info.email}>Chi tiết</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ "margin-top": "-35px" }}>
                                    <b>{abbreviateNumber(info.price)} VND</b><br></br>
                                    Giá / Giờ
                                    </Col>
                            </Row>
                            <hr style={{ "width": "200px" }}></hr>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        });

        setListTeacherHTML(<Row>{resultHTML}</Row>);
    }

    function setupPagination(data) {

        // const numberOfPage = Math.ceil(data.length / 1);

        // var resultHTML = [<Pagination.First />, <Pagination.Prev />];
        // for (var i = 1; i <= numberOfPage; i++) {
        //     resultHTML.push(<Pagination.Item onClick={() => gotoPage(i)} active={currentPage == i ? true : false}>{i}</Pagination.Item>)
        // }
        // resultHTML.push(<Pagination.Next />);
        // resultHTML.push(<Pagination.Last />);

        // setPaginationHTML(resultHTML);
    }

    // function gotoPage(i) {
    //     setPaginationHTML(teachersArray);
    // }
}

function abbreviateNumber(number) {
    var SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];
    var tier = Math.log10(number) / 3 | 0;
    if (tier === 0) return number;
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
    return scaled.toFixed(0) + suffix;
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