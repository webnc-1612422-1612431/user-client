import React, { useState, useEffect } from "react";
import { Button, Pagination, Card, Col, Row, Container } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import config from '../config';
import '../css/tags.css';

const axios = require('axios');
const profilePerPage = 3;
var teachersArray;

export default function ListTeacher() {

    const [listTeacherHTML, setListTeacherHTML] = useState('');
    const [paginationHTML, setPaginationHTML] = useState('');

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
                    setupListTeacher(teachersArray, 1);
                    setupPagination(teachersArray, 1);
                }
            })
            .catch(err => {
                window.location.href = '/';
            })
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        {paginationHTML}
                    </Pagination>
                </center>
            </Card.Footer>
        </Card>
    );

    function setupListTeacher(data, currentPage) {
        var resultHTML = data.map((info, index) => {

            // filter for paging
            const start = (currentPage - 1) * profilePerPage;
            const end = start + profilePerPage - 1;
            if (index < start || index > end) {
                return '';
            }

            const avatarHTML = {
                "background-image": "url('" + info.avatar + "')",
                "padding": "75%",
                "margin-left": "-10px"
            }
            return <Col>
                <Card className="card-small">
                    <Card.Header className="card-header-small">{info.fullname}</Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col xs={1}><div className="ratio img-responsive img-circle" style={avatarHTML}></div></Col>
                                <Col>
                                    <b>{localizeDegree(info.degree)}</b><br></br>
                                    Chuyên môn: <b>{localizeMajor(info.major)}</b>
                                    <br></br>
                                    Giá trên giờ: <b>{abbreviateNumber(info.price)}</b>
                                    <br></br><br></br>
                                    <Button size="sm" href={'detail-teacher?email=' + info.email}>CHI TIẾT</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ "margin-top": "-20px" }}>
                                    <StarRatings
                                        rating={4.5}
                                        starDimension="13px"
                                        starSpacing="0px"
                                        starRatedColor="green"
                                    /><br></br>ĐGiá: 4.5/5
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        });

        setListTeacherHTML(<Row>{resultHTML}</Row>);
    }

    function setupPagination(data, currentPage) {

        const numberOfPage = Math.ceil(data.length / profilePerPage);

        var resultHTML = [<Pagination.First onClick={() => gotoPage(1)} />, <Pagination.Prev onClick={() => gotoPage(currentPage === 1 ? 1 : (currentPage - 1))} />];
        for (var i = 1; i <= numberOfPage; i++) {
            const index = i;
            resultHTML.push(<Pagination.Item onClick={() => gotoPage(index)} active={currentPage === index ? true : false}>{index}</Pagination.Item>)
        }
        resultHTML.push(<Pagination.Next onClick={() => gotoPage(currentPage === numberOfPage ? numberOfPage : (currentPage + 1))} />);
        resultHTML.push(<Pagination.Last onClick={() => gotoPage(numberOfPage)} />);

        setPaginationHTML(resultHTML);
    }

    function gotoPage(i) {
        setupPagination(teachersArray, i);
        setupListTeacher(teachersArray, i);
    }
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