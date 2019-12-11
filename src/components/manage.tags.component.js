import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import config from '../config';
import '../css/tags.css';

const axios = require('axios');
var rawSuggestions;

export default function ManageTags() {

    const [suggestions, setSuggestions] = useState([]);
    const [tags, setTags] = useState([]);

    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [suggestionsHTML, setSuggestionsHTML] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token != null) {
            axios.get(config['server-domain'] + 'profile/tags', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data) {
                            rawSuggestions = res.data.suggestions;
                            const arraySuggestion = rawSuggestions.map(x => x.skill);
                            setSuggestionsHTML(arraySuggestion.map((text, step) => {
                                return <li key={step}>{text}</li>
                            }));
                            setSuggestions(arraySuggestion);
                            setTags(res.data.tags);
                        }
                    }
                })
                .catch(err => {
                    window.location.href = '/';
                })
        }
        else {
            window.location.href = '/';
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');
        axios.post(config['server-domain'] + 'profile/update-tags', {
            skillsid: tags.map(x => x.id)
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data) {
                    setShow(true);
                    setModalContent(res.data.message);
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    setShow(true);
                    setModalContent(err.response.data.message);
                }
            });
    }

    return (
        <div>
            <center><h2><br></br><b>DANH SÁCH KỸ NĂNG</b></h2>
                <form onSubmit={handleSubmit}>
                    <ReactTags tags={tags} inline
                        suggestions={suggestions}
                        handleDelete={(i) => handleDelete(i)}
                        handleAddition={(tag) => handleAddition(tag)}
                        handleTagClick={(i) => handleDelete(i)} />
                    <br></br>
                    <div className='center'>
                        <button type="submit" className="btn btn-primary btn-block">Lưu lại</button>
                    </div>
                </form>
            </center>
            <div className='select-tags form-control'>
                <label>Danh sách kỹ năng</label>
                <ul>{suggestionsHTML}</ul>
            </div>
            <Modal show={show} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );

    function handleDelete(i) {
        setTags(tags.filter((tag, index) => index !== i))
    }

    function handleAddition(tag) {
        for (var i = 0; i < rawSuggestions.length; i++) {
            if (rawSuggestions[i].skill === tag) {
                setTags([...tags, { id: rawSuggestions[i].id, text: tag }]);
            }
        }
    }
}