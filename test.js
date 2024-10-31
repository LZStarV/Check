const http = require('http');
const querystring = require('querystring');

const params = {
    r: 'sign/WxSign',
    sr_id: 114514,
    name: 'xxx',
    code: '20232131082',
    week: 8,
    type: '正常签到',
    s_type: '课程',
};

const hostname = 'shenhailao.com';
const basePath = '/sign-in-management-system-back/index.php';
const path = `${basePath}?${querystring.stringify(params)}`;
const options = {
    hostname: hostname,
    port: 443,
    path: path,
    method: 'GET',
    headers: {
        'Host': hostname,
        'Connection': 'keep-alive',
        'xweb_xhr': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c11)XWEB/11275',
        'Accept': '*/*',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://servicewechat.com/wx694dda7a5f554038/16/page-frame.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9'
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(data);
    });
});

req.setTimeout(2000, () => {
    console.log('请求超时，已中断');
    req.abort();
});

req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
});

req.end();