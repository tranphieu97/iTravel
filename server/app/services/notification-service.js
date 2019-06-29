const database = require('../database.js');
const ObjectId = require('mongodb').ObjectId;

exports = module.exports = {};

exports.sendNotificationOld = async (fromId, toId, content, linkTo) => {
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

/**
 * @param notificationItem from?, to?, content, linkTo?, type?
 * @param fromId string
 * @param toIds string[] | null(if send all)
 */
exports.sendNotification = async (notificationItem, userId, toIds = '') => {
    try {
        const newNotificationItem = {
            _id: new ObjectId(),
            from: userId,
            to: notificationItem.to ? notificationItem.to : 'ALL',
            content: notificationItem.content,
            time: notificationItem.time
                ? new Date(notificationItem.time)
                : new Date(),
            seen: false,
            linkTo: notificationItem.linkTo ? notificationItem.linkTo : '',
            type: notificationItem.type ? notificationItem.type : ''
        }
        let receiverList = []

        if (toIds && toIds.length){
            receiverList = toIds;
        } else {
            const userList = await database.getCollectionDataByProjection(database.iTravelDB.Users, {}, {'_id': 1});
            receiverList = userList.map(user => String(user._id))
        }

        const queryObj = {
            userId: { $in: receiverList }
        }
        const updateObject = {
            $addToSet: {
                notificationItems: newNotificationItem
            }
        };
        return database.updateManyDocument(database.iTravelDB.Notifications, queryObj, updateObject);
    } catch (error) {
        console.error('error', error.message)
    }
}