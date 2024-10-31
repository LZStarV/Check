// sendWechat.js
const axios = require('axios');

const SEND_KEY = 'SCT260629TXqHbhkHyV471gT4qX6Uf1OXE';

const sendWechat = (text, desp) => {
    const url = `https://sctapi.ftqq.com/${SEND_KEY}.send`;
    return axios.post(url, {
        text: text,
        desp: desp,
    })
};

module.exports = sendWechat;