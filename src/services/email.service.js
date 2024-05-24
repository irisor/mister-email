import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}


const STORAGE_KEY = 'mailDB'

_createMails()

async function query(filterBy) {
    let mails = await storageService.query(STORAGE_KEY)
    // if (filterBy) {
    //     let { type, maxBatteryStatus, minBatteryStatus, model } = filterBy
    //     maxBatteryStatus = maxBatteryStatus || Infinity
    //     minBatteryStatus = minBatteryStatus || 0
    //     mails = mails.filter(mail => mail.type.toLowerCase().includes(type.toLowerCase()) && mail.model.toLowerCase().includes(model.toLowerCase())
    //         && (mail.batteryStatus < maxBatteryStatus)
    //         && mail.batteryStatus > minBatteryStatus)
    // }
    return mails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(mailToSave) {
    if (mailToSave.id) {
        return storageService.put(STORAGE_KEY, mailToSave)
    } else {
        mailToSave.isOn = false
        return storageService.post(STORAGE_KEY, mailToSave)
    }
}

function createEmail(model = '', type = '', batteryStatus = 100) {
    return {
        model,
        batteryStatus,
        type
    }
}

function _createMails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [

            { id: 'e101', fromEmail: 'alice@example.com', fromFullname: 'Alice Smith', toEmail: 'bob@example.com', toFullname: 'Bob Johnson', subject: 'Meet for lunch', sentAt: new Date('2021-01-01'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e102', fromEmail: 'bob@example.com', fromFullname: 'Bob Johnson', toEmail: 'alice@example.com', toFullname: 'Alice Smith', subject: 'Re: Meet for lunch', sentAt: new Date('2021-01-02'), isStarred: true, status: 'inbox', body: 'Sure, see you at 2pm', isRead: false, removedAt: null },
            { id: 'e103', fromEmail: 'charlie@example.com', fromFullname: 'Charlie Brown', toEmail: 'dave@example.com', toFullname: 'Dave Smith', subject: 'Promotion', sentAt: new Date('2021-01-03'), isStarred: false, status: 'inbox', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e104', fromEmail: 'dave@example.com', fromFullname: 'Dave Smith', toEmail: 'charlie@example.com', toFullname: 'Charlie Brown', subject: 'Meet for dinner', sentAt: new Date('2021-01-04'), isStarred: false, status: 'draft', body: 'I have a table reserved at 7pm', isRead: false, removedAt: null },
            { id: 'e105', fromEmail: 'eve@example.com', fromFullname: 'Eve Evans', toEmail: 'frank@example.com', toFullname: 'Frank Johnson', subject: 'Social', sentAt: new Date('2021-01-05'), isStarred: false, status: 'sent', body: 'Let\'s meet for cocktails at 9pm', isRead: true, removedAt: null },
            { id: 'e106', fromEmail: 'frank@example.com', fromFullname: 'Frank Johnson', toEmail: 'eve@example.com', toFullname: 'Eve Evans', subject: 'Promotion', sentAt: new Date('2021-01-06'), isStarred: false, status: 'trash', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e107', fromEmail: 'george@example.com', fromFullname: 'George Smith', toEmail: 'harry@example.com', toFullname: 'Harry Johnson', subject: 'Meet for lunch', sentAt: new Date('2021-01-07'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e108', fromEmail: 'harry@example.com', fromFullname: 'Harry Johnson', toEmail: 'george@example.com', toFullname: 'George Smith', subject: 'Social', sentAt: new Date('2021-01-08'), isStarred: true, status: 'inbox', body: 'Let\'s grab drinks tonight', isRead: false, removedAt: null },
            { id: 'e109', fromEmail: 'ivan@example.com', fromFullname: 'Ivan Ivanov', toEmail: 'nick@example.com', toFullname: 'Nick Smith', subject: 'Re: Meet for lunch', sentAt: new Date('2021-01-09'), isStarred: false, status: 'inbox', body: 'Sure, I can make it at 1pm', isRead: false, removedAt: null },
            { id: 'e110', fromEmail: 'john@example.com', fromFullname: 'John Doe', toEmail: 'olivia@example.com', toFullname: 'Olivia Johnson', subject: 'Promotion', sentAt: new Date('2021-01-10'), isStarred: false, status: 'inbox', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e111', fromEmail: 'kate@example.com', fromFullname: 'Kate Smith', toEmail: 'mike@example.com', toFullname: 'Mike Johnson', subject: 'Meet for dinner', sentAt: new Date('2021-01-11'), isStarred: false, status: 'draft', body: 'I have a table reserved at 8pm', isRead: false, removedAt: null },
            { id: 'e112', fromEmail: 'lisa@example.com', fromFullname: 'Lisa Johnson', toEmail: 'nick@example.com', toFullname: 'Nick Smith', subject: 'Social', sentAt: new Date('2021-01-12'), isStarred: false, status: 'sent', body: 'Let\'s meet for drinks tomorrow', isRead: true, removedAt: null },
            { id: 'e113', fromEmail: 'mike@example.com', fromFullname: 'Mike Johnson', toEmail: 'olivia@example.com', toFullname: 'Olivia Johnson', subject: 'Promotion', sentAt: new Date('2021-01-13'), isStarred: false, status: 'trash', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e114', fromEmail: 'nick@example.com', fromFullname: 'Nick Smith', toEmail: 'kate@example.com', toFullname: 'Kate Brown', subject: 'Meet for lunch', sentAt: new Date('2021-01-14'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e115', fromEmail: 'olivia@example.com', fromFullname: 'Olivia Johnson', toEmail: 'harry@example.com', toFullname: 'Harry Johnson', subject: 'Social', sentAt: new Date('2021-01-15'), isStarred: true, status: 'inbox', body: 'Let\'s grab drinks tonight', isRead: false, removedAt: null },
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




