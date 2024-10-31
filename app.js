const { updateData } = require('./data-storage');
const sendRequest = require('./sendRequest');
// const sendWechat = require('./sendWechat');
const sendEmail = require('./sendEmail');

// 定义一个暂停函数，单位为毫秒
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let isPaused = false;

// 主函数
const runMainLogic = async () => {
    if (isPaused) return;
    const latestData = updateData();
    const now = new Date();
    const checkTimeDate = new Date(`${latestData.Date}T${latestData.checkTime}:00`);
    const minsDiff = (checkTimeDate - now) / (1000 * 60);

    if (minsDiff <= 0 && minsDiff >= -10) {
        try {
            const data = await sendRequest({
                r: 'sign/WxSign',
                'sr_id': latestData.srId + latestData.weekNumber - 1,  // 根据周数更新sr_id
                name: latestData.name,
                code: '20232131082',
                week: latestData.weekNumber,
                type: '正常签到',
                s_type: '课程',
            });
            const jsonData = JSON.parse(data);
            const message = `课程名称：${latestData.name}\n签到周数： ${latestData.weekNumber}\n签到信息：${jsonData.data}`;
            console.log(`当前时间：${now.toLocaleString()}，签到时间：${checkTimeDate.toLocaleString()}\nGET请求结果:\n`, message);
            // 发送邮件消息
            await sendEmail(message);
            console.log('邮件消息发送成功');
        } catch (error) {
            console.error('发送请求或邮件失败:', error);
        }
        // 设置暂停标志
        isPaused = true;
        console.log('开始暂停，90分钟后继续...');
        await sleep(90 * 60 * 1000); // 暂停90分钟
        console.log('暂停结束，继续执行: ');
        isPaused = false;
    } else {
        // console.clear(); //清屏
        console.log(`${latestData.name} 签到时间未到，当前时间：${now.toLocaleString()}，签到时间：${checkTimeDate.toLocaleString()}`);
        return;
    }
};

runMainLogic();

// 每隔10分钟运行一次主要逻辑
setInterval(() => {
    if (!isPaused) {
        runMainLogic();
    }
}, 10 * 60 * 1000);