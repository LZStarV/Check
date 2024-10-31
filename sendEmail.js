// sendEmail.js
const nodemailer = require('nodemailer');

// 创建 SMTP 客户端
const transporter = nodemailer.createTransport({
    host: 'Smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: '3654498270@qq.com',
        pass: 'zgtwmswtgihldagf'
    }
});

// 发送邮件的函数
const sendEmail = (message) => {
    const mailOptions = {
        from: '3654498270@qq.com',
        to: 'lzstarv123@163.com',
        subject: '签到信息',
        text: message
    };

    // 使用 transporter 发送邮件
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info.response);
            }
        });
    });
};

module.exports = sendEmail;