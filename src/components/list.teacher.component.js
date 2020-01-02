import React, { useState, useEffect } from 'react';
import { Button, Pagination, Card, Col, Row, Container } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import config from '../config';
import '../css/tags.css';

const axios = require('axios');
const profilePerPage = 3;
var teachersArray;

export default function ListTeacher(props) {

    const { special } = props;
    const [listTeacherHTML, setListTeacherHTML] = useState('');
    const [paginationHTML, setPaginationHTML] = useState('');
    const [listType, setListType] = useState(special);

    if (window.location.href.indexOf('?major=') !== -1) {
        var major = window.location.href.substr(window.location.href.indexOf('?major=') + '?major='.length);
    }
    else {
        major = 'all';
    }

    useEffect(() => {
        axios.get(config['server-domain'] + 'public/all-teacher', {
            params: {
                major: major,
                special: listType
            }
        })
            .then((res) => {
                if (res.data && res.data.teachers) {
                    teachersArray = res.data.teachers;
                    setupListTeacher(teachersArray, 1);
                    setupPagination(teachersArray, 1);
                }
            })
            .catch(err => {
                window.location.href = '/';
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [major, listType]);

    return (
        <Card className='card-list'>
            <Card.Header>
                Danh sách giáo viên <b>{localizeMajor(major)}</b>
                {special === undefined ? '' : <div className='sort-list'>
                    <select className='form-control-sm' onChange={(e) => setListType(e.target.value)}>
                        <option value='all'>Tất cả</option>
                        <option value='top-rate' selected>Được đánh giá cao nhất</option>
                        <option value='top-number-contract'>Tỷ lệ thành công cao nhất</option>
                    </select>
                </div>}
            </Card.Header>
            <Container className='container-list'>
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
                'background-image': 'url(\'' + info.avatar + '\')',
                'padding': '75%',
                'margin-left': '-10px'
            }
            return <Col>
                <Card className='card-small'>
                    <Card.Header className='card-header-small'>{info.fullname}</Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col xs={1}><div className='ratio img-responsive img-circle' style={avatarHTML}></div></Col>
                                <Col>
                                    <b>{localizeDegree(info.degree)}</b><br></br>
                                    Chuyên môn: <b>{localizeMajor(info.major)}</b>
                                    <br></br>
                                    Giá trên giờ: <b>{abbreviateNumber(info.price)}</b>
                                    <br></br><br></br>
                                    <Button size='sm' href={'detail-teacher?email=' + info.email}>CHI TIẾT</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ 'margin-top': '-20px' }}>
                                    <StarRatings
                                        rating={info.rate || 0}
                                        starDimension='13px'
                                        starSpacing='0px'
                                        starRatedColor={(info.rate && info.rate < 3) ? 'red' : 'green'}
                                    /><br></br>ĐGiá: {info.rate || 0}/5
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
    var SI_SYMBOL = ['', 'K', 'M', 'G', 'T', 'P', 'E'];
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