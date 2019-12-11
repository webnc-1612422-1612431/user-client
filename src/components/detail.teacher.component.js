import React, { useState, useEffect } from "react";
import { Button, Modal, Col } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import config from '../config';
import '../css/tags.css';

const axios = require('axios');

export default function DetailTeacher() {

    const [info, setInfo] = useState({});
    const [tags, setTags] = useState([]);
    const [avatarStyle, setAvatarStyle] = useState(getStyleAvatar('https://www.songthuanchay.vn/wp-content/uploads/2019/04/a-avatar-0.jpg'));


    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <Col xs={2} md={2}>
                        <div className="ratio img-responsive img-circle" style={avatarStyle}></div>
                    </Col>
                </div>
                <div class="col-sm">
                    <Col xs={2} md={2}>
                        <div className="ratio img-responsive img-circle" style={avatarStyle}></div>
                    </Col>
                </div>
            </div>
        </div>
    );

    function getStyleAvatar(url) {
        return {
            "background-image": "url('" + url + "')"
        }
    }
}