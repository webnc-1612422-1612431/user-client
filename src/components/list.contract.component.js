import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import config from '../config';
import '../css/tags.css';

const axios = require('axios');
var contractsArray;
var flagArray;

export default function ListContract() {

    const [contractHTML, setContractHTML] = useState('');

    // for filter
    const [state, setState] = useState('all');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token != null) {
            axios.post(config['server-domain'] + 'profile/get-contracts', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(ress => {
                    if (ress.data && ress.data.contracts) {
                        contractsArray = ress.data.contracts;
                        handleSubmit();
                    }
                })
                .catch(errr => { window.location.href = '/'; });
        }
        else {
            window.location.href = '/';
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSubmit(e) {
        if (e) e.preventDefault();

        flagArray = new Array(contractsArray.length).fill(1);
        for (let i = 0; i < flagArray.length; i++) {
            if (state !== 'all' && parseInt(state) !== contractsArray[i].state) {
                flagArray[i] = 0;
                continue;
            }
        }

        setupContracts(contractsArray);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <center>
                    <br></br><br></br>
                    <label>Trạng thái:&ensp;</label>
                    <select className='form-control-sm' onChange={(e) => setState(e.target.value)}>
                        <option selected value='all'>Tất cả</option>
                        <option value='0'>Chưa hoàn thành</option>
                        <option value='1'>Đã hủy</option>
                        <option value='2'>Đã hoàn thành</option>
                    </select>
                    &ensp;
                    &ensp;
                    <input type="submit" className='form-control-sm' style={{ width: '100px' }} value='Tìm kiếm'></input>
                </center>
            </form>
            {contractHTML}
        </div>
    );

    function setupContracts(contracts) {

        // filter
        contracts = contracts.filter((x, i) => flagArray[i] === 1);

        const contractRows = [];

        let maxSkillLength = 0;
        for (var k = 0; k < contracts.length; k++) {
            if (contracts[k].skill.length > maxSkillLength) {
                maxSkillLength = contracts[k].skill.length;
            }
        }

        for (var i = 0; i < contracts.length; i++) {
            const contractId = contracts[i].id;
            const skillname = contracts[i].skill;
            contractRows.push(<Row>
                <Col xs={maxSkillLength > 30 ? 4 : 3}>
                    <br></br>
                    <center><ReactTags tags={[{ id: 1, text: skillname }]} readOnly={true} /></center>
                </Col>
                <Col style={{ 'line-height': '20px' }}>
                    <b>Đối tác:</b> {contracts[i].fullname}
                    <br></br>
                    <b>Thời gian:</b> {contracts[i].start} - {contracts[i].end}
                    <br></br>
                    <b>Giá toàn khóa:</b> {abbreviateNumber(contracts[i].revenue)}
                    <br></br>
                    <b>Trạng thái:</b> {contracts[i].state === 0 ? 'Chưa hoàn thành' : contracts[i].state === 1 ? 'Đã hủy' : 'Đã hoàn thành'}
                </Col>
                <Col>
                    <center>
                        <Button size="sm" onClick={() => { window.location.href = '/detail-contract?id=' + contractId }}>Xem chi tết</Button><br></br>
                        <b>Ngày tạo: </b>{contracts[i].signeddate}
                    </center>
                </Col>
            </Row>);

            if (i !== contracts.length - 1) {
                contractRows.push(<hr style={{ width: '93%' }}></hr>)
            }
        }

        if (contracts.length === 0) {
            contractRows.push(<Row>Chưa có hợp đồng nào</Row>);
        }

        const html = <Card className="card-center">
            <Card.Header className="card-header">Danh sách hợp đồng</Card.Header>
            <Card.Body style={{ 'max-height': '400px', overflow: 'hidden', 'overflowY': 'scroll' }}>
                <Container>
                    {contractRows}
                </Container>
            </Card.Body>
        </Card>

        setContractHTML(html);
    }
}

function abbreviateNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}