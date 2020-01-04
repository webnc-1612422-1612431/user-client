import React, { useState, useEffect } from 'react';
import { Button, Pagination, Card, Col, Row, Container } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import config from '../config';
import '../css/tags.css';

const axios = require('axios');
const profilePerPage = 3;
var teachersArray;
var flagArray;

export default function ListTeacher(props) {

    const { special } = props;
    const [listTeacherHTML, setListTeacherHTML] = useState('');
    const [paginationHTML, setPaginationHTML] = useState('');
    const [listType, setListType] = useState(special);

    // for filter
    const [degree, setDegree] = useState('all');
    const [subject, setSubject] = useState('all');
    const [address, setAddress] = useState('');
    const [priceRange, setPriceRange] = useState('');

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
                    handleSubmit();
                }
            })
            .catch(err => {
                window.location.href = '/';
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [major, listType]);

    function handleSubmit(e) {
        if (e) e.preventDefault();

        flagArray = new Array(teachersArray.length).fill(1);
        for (let i = 0; i < flagArray.length; i++) {

            // check degree
            if (degree !== 'all' && degree !== teachersArray[i].degree) {
                flagArray[i] = 0;
                continue;
            }
            // check major
            if (subject !== 'all' && subject !== teachersArray[i].major) {
                flagArray[i] = 0;
                continue;
            }
            // check price
            if (priceRange !== 'all') {
                var res = priceRange.split('-');
                if (teachersArray[i].price < parseInt(res[0]) || parseInt(res[1]) < teachersArray[i].price) {
                    flagArray[i] = 0;
                    continue;
                }
            }
            // check address
            if (address.trim().length > 0 && teachersArray[i].address.toLowerCase().includes(address.trim().toLowerCase()) === false) {
                flagArray[i] = 0;
                continue;
            }
        }

        setupListTeacher(teachersArray, 1);
        setupPagination(teachersArray, 1);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <center>
                    <br></br>
                    <label>Bằng cấp:&ensp;</label>
                    <select className='form-control-sm' onChange={(e) => setDegree(e.target.value)}>
                        <option selected value='all'>Tất cả</option>
                        <option value='college'>Cao Đẳng</option>
                        <option value='university'>Đại Học</option>
                        <option value='master'>Thạc Sĩ</option>
                        <option value='doctor'>Tiến Sĩ</option>
                        <option value='professor'>Giáo Sư</option>
                    </select>
                    &ensp;
                <label>Chuyên môn:&ensp;</label>
                    <select className='form-control-sm' onChange={(e) => setSubject(e.target.value)}>
                        <option selected value='all'>Tất cả</option>
                        <option value='math'>Toán</option>
                        <option value='physics'>Vật Lý</option>
                        <option value='chemistry'>Hóa Học</option>
                        <option value='literature'>Ngữ Văn</option>
                        <option value='it'>Tin học</option>
                        <option value='geography'>Địa Lý</option>
                        <option value='history'>Lịch sử</option>
                        <option value='english'>Tiếng Anh</option>
                    </select>
                    &ensp;
                <label>Giá trên giờ:&ensp;</label>
                    <select className='form-control-sm' onChange={(e) => setPriceRange(e.target.value)}>
                        <option selected value='all'>Tất cả</option>
                        <option value='0-100000'>Dưới 100K</option>
                        <option value='100000-199000'>100K - 199K</option>
                        <option value='200000-499000'>200K - 499K</option>
                        <option value='500000-1000000'>500K - 1M</option>
                        <option value='1000000-1000000000'>Trên 1M</option>
                    </select>
                    &ensp;
                <label>Địa chỉ:&ensp;</label>
                    <input className='form-control-sm' onChange={(e) => setAddress(e.target.value)}></input>
                    <input type="submit" className='form-control-sm' style={{ width: '100px' }} value='Tìm kiếm'></input>
                </center>
            </form>
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
        </div>
    );

    function setupListTeacher(data, currentPage) {

        // filter
        data = data.filter((x, i) => flagArray[i] === 1);

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
                                    Địa chỉ: <b>{info.address}</b>
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
                                    /><br></br><b>ĐGiá:</b> {info.rate || 0}/5&nbsp;&nbsp;|&nbsp;&nbsp;<b>Giá/H:</b> {abbreviateNumber(info.price)}
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

        // filter
        data = data.filter((x, i) => flagArray[i] === 1);

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
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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