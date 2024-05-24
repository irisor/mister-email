import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const mailService = {
    query,
    save,
    remove,
    getById,
    createMail,
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

function createMail(model = '', type = '', batteryStatus = 100) {
    return {
        model,
        batteryStatus,
        type
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(STORAGE_KEY)
    if (!mails || !mails.length) {
        mails = [
            { id: 'm1', sender: 'Alice', subject: 'Meet for lunch', sentAt: new Date('2021-01-01'), isStarred: false, folder: 'inbox', category: 'primary', content: 'Please join me for lunch today', isRead: false },
            { id: 'm2', sender: 'Bob', subject: 'Re: Meet for lunch', sentAt: new Date('2021-01-02'), isStarred: true, folder: 'inbox', category: 'primary', content: 'Sure, see you at 2pm', isRead: false },
            { id: 'm3', sender: 'Charlie', subject: 'Promotion', sentAt: new Date('2021-01-03'), isStarred: false, folder: 'inbox', category: 'promotion', content: 'Congratulations on your promotion', isRead: false },
            { id: 'm4', sender: 'Dave', subject: 'Meet for dinner', sentAt: new Date('2021-01-04'), isStarred: false, folder: 'draft', category: 'primary', content: 'I have a table reserved at 7pm', isRead: false },
            { id: 'm5', sender: 'Eve', subject: 'Social', sentAt: new Date('2021-01-05'), isStarred: false, folder: 'sent', category: 'social', content: 'Let\'s meet for cocktails at 9pm', isRead: true },
            { id: 'm6', sender: 'Frank', subject: 'Promotion', sentAt: new Date('2021-01-06'), isStarred: false, folder: 'trash', category: 'promotion', content: 'Congratulations on your promotion', isRead: false },
            { id: 'm7', sender: 'George', subject: 'Meet for lunch', sentAt: new Date('2021-01-07'), isStarred: false, folder: 'inbox', category: 'primary', content: 'Please join me for lunch today', isRead: false },
            { id: 'm8', sender: 'Harry', subject: 'Social', sentAt: new Date('2021-01-08'), isStarred: true, folder: 'inbox', category: 'social', content: 'Let\'s grab drinks tonight', isRead: false },
            { id: 'm9', sender: 'Ivan', subject: 'Re: Meet for lunch', sentAt: new Date('2021-01-09'), isStarred: false, folder: 'inbox', category: 'primary', content: 'Sure, I can make it at 1pm', isRead: false },
            { id: 'm10', sender: 'John', subject: 'Promotion', sentAt: new Date('2021-01-10'), isStarred: false, folder: 'inbox', category: 'promotion', content: 'Congratulations on your promotion', isRead: false },
            { id: 'm11', sender: 'Kate', subject: 'Meet for dinner', sentAt: new Date('2021-01-11'), isStarred: false, folder: 'draft', category: 'primary', content: 'I have a table reserved at 8pm', isRead: false },
            { id: 'm12', sender: 'Lisa', subject: 'Social', sentAt: new Date('2021-01-12'), isStarred: false, folder: 'sent', category: 'social', content: 'Let\'s meet for drinks tomorrow', isRead: true },
            { id: 'm13', sender: 'Mike', subject: 'Promotion', sentAt: new Date('2021-01-13'), isStarred: false, folder: 'trash', category: 'promotion', content: 'Congratulations on your promotion', isRead: false },
            { id: 'm14', sender: 'Nick', subject: 'Meet for lunch', sentAt: new Date('2021-01-14'), isStarred: false, folder: 'inbox', category: 'primary', content: 'Please join me for lunch today', isRead: false },
            { id: 'm15', sender: 'Olivia', subject: 'Social', sentAt: new Date('2021-01-15'), isStarred: true, folder: 'inbox', category: 'social', content: 'Let\'s grab drinks tonight', isRead: false },
        ]
        utilService.saveToStorage(STORAGE_KEY, mails)
    }
}




