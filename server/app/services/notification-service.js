const database = require('../database.js');
const ObjectId = require('mongodb').ObjectId;

exports = module.exports = {};

exports.sendNotification = async (fromId, toId, content, linkTo) => {
    try {
        const newNoti = {
            _id: new ObjectId(),
            from: fromId,
            to: toId,
            content: content,
            time: new Date(),
            seen: false,
            linkTo: linkTo
        }

        const queryObj = { userId: toId }

        // validate
        if (newNoti.from.length !== 24
            || newNoti.to.length !== 24
            || newNoti.content.length <= 0
            || newNoti.content.length > 200
            || newNoti.linkTo.length > 200)
            return

        let notification = await database.getOneFromCollection(database.iTravelDB.Notifications, queryObj);
        if (notification) {
            notification.notificationItems.push(newNoti)
            await database.updateDocumentByFilter(database.iTravelDB.Notifications, queryObj, { notificationItems: notification.notificationItems });
        }
    } catch (error) {
        console.error('error', error)
    }
}