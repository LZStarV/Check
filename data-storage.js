const fs = require('fs');
const path = require('path');

// 定义数据文件路径
const dataFilePath = path.join(__dirname, 'data.json');

// 加载数据
const loadData = () => {
    try {
        return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    } catch (error) {
        return [];
    }
};

// 保存数据
const saveData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// 更新数据
const updateData = () => {
    const data = loadData();
    const now = new Date();

    let latestData = null;

    for (let item of data) {

        const startDate = new Date(item.startDate);

        // 计算周数差
        let daysDiff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        let weeksDiff = Math.floor(daysDiff / 7);


        // 计算下一次签到的日期
        let nextCheckDate = new Date(startDate.getTime() + weeksDiff * 7 * 24 * 60 * 60 * 1000);
        const [hours, minutes] = item.checkTime.split(':').map(Number);
        nextCheckDate.setHours(hours);
        nextCheckDate.setMinutes(minutes);

        let minutesDiff = (nextCheckDate - new Date(now)) / (1000 * 60);

        // 如果日期与今天相同，但签到时间早于现在的时间超过10min，则增加 7 天
        if (minutesDiff < -10) {
            nextCheckDate.setDate(nextCheckDate.getDate() + 7);
            weeksDiff += 1;
        }

        // 更新数据项
        item.weekNumber = weeksDiff + 1;
        item.Date = nextCheckDate.toISOString().split('T')[0];

        // 将日期和时间组合，以便进行比较
        const checkTimeDate = nextCheckDate;

        // 计算当前项签到时间与当前时间的差异（毫秒）
        let diffCurrentItem = (checkTimeDate - now);

        // 筛选需要签到的课程
        if (!latestData || diffCurrentItem < (new Date(`${latestData.Date}T${latestData.checkTime}`) - now)) {
            latestData = item;
        }
    }

    // 保存更新后的数据
    saveData(data);
    // 暴露最新数据
    return latestData;
};

module.exports = {
    loadData,
    saveData,
    updateData
};