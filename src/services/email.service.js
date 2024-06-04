import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    isLoggedinUser,
    query,
    isInFilter,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    toggleStar,
    toggleRead,
    setIsRead,
    changeStatus,
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function isLoggedinUser(email) {
    return email === loggedinUser.email
}


const STORAGE_KEY = 'mailDB'

_createMails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        emails = emails.filter(email => isInFilter(email, filterBy) 
    )}
    return emails
}

function isInFilter(email, filterBy) {
    if (!filterBy) return true
    const { status, readStatus, isStarred, text } = filterBy
    return (status === 'All' || email.status === status) && 
        (readStatus === 'All' || email.isRead && readStatus === 'Read' || !email.isRead && readStatus === 'Unread') && 
        (!isStarred || email.isStarred) &&
        (!text || email.subject.toLowerCase().includes(text.toLowerCase()) || email.body.toLowerCase().includes(text.toLowerCase()))
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

function getDefaultFilter({ folder='inbox', readStatus="All", isStarred=false, text=null }) {
    return {
       status: folder != 'starred' ? folder : 'All',
       readStatus,
       isStarred: isStarred || folder === 'starred' ? true : false,
       text
    }
}

async function toggleStar(emailId) {
    const email = await getById(emailId)
    email.isStarred = !email.isStarred
    save(email)
}

async function toggleRead(emailId) {
    const email = await getById(emailId)
    email.isRead = !email.isRead
    save(email)
}

async function setIsRead(emailId) {
    const email = await getById(emailId)
    email.isRead = true
    save(email)
}

async function changeStatus(emailId, newStatus) {
    const email = await getById(emailId)
    email.status = newStatus
    save(email)
}

function _createMails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [

            { id: 'e101', fromEmail: 'alice@example.com', fromFullname: 'Alice Smith', toEmail: 'bob@example.com', toFullname: 'Bob Johnson', subject: 'Meet for lunch', sentAt: new Date('2024-06-06T00:00:00'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: true, removedAt: null },
            { id: 'e102', fromEmail: 'bob@example.com', fromFullname: 'Bob Johnson', toEmail: 'alice@example.com', toFullname: 'Alice Smith', subject: 'Re: Meet for lunch', sentAt: new Date('2024-01-02T00:00:00'), isStarred: true, status: 'inbox', body: 'Sure, see you at 2pm', isRead: false, removedAt: null },
            { id: 'e103', fromEmail: 'charlie@example.com', fromFullname: 'Charlie Brown', toEmail: 'dave@example.com', toFullname: 'Dave Smith', subject: 'Promotion', sentAt: new Date('2024-05-28T05:17:22'), isStarred: false, status: 'inbox', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e104', fromEmail: 'dave@example.com', fromFullname: 'Dave Smith', toEmail: 'charlie@example.com', toFullname: 'Charlie Brown', subject: 'Meet for dinner', sentAt: new Date('2024-05-28T18:05:03'), isStarred: false, status: 'draft', body: 'I have a table reserved at 7pm', isRead: true, removedAt: null },
            { id: 'e105', fromEmail: 'eve@example.com', fromFullname: 'Eve Evans', toEmail: 'user@appsus.com', toFullname: 'Frank Johnson', subject: 'Social', sentAt: new Date('2021-01-05T00:00:00'), isStarred: false, status: 'sent', body: 'Let\'s meet for cocktails at 9pm', isRead: true, removedAt: null },
            { id: 'e106', fromEmail: 'frank@example.com', fromFullname: 'Frank Johnson', toEmail: 'eve@example.com', toFullname: 'Eve Evans', subject: 'Promotion', sentAt: new Date('2021-01-06T00:00:00'), isStarred: false, status: 'trash', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e107', fromEmail: 'george@example.com', fromFullname: 'George Smith', toEmail: 'harry@example.com', toFullname: 'Harry Johnson', subject: 'Meet for lunch', sentAt: new Date('2021-01-07T00:00:00'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e108', fromEmail: 'harry@example.com', fromFullname: 'Harry Johnson', toEmail: 'george@example.com', toFullname: 'George Smith', subject: 'Social', sentAt: new Date('2021-01-08'), isStarred: true, status: 'inbox', body: 'Let\'s grab drinks tonight', isRead: true, removedAt: null },
            { id: 'e109', fromEmail: 'ivan@example.com', fromFullname: 'Ivan Ivanov', toEmail: 'nick@example.com', toFullname: 'Nick Smith', subject: 'Re: Meet for lunch', sentAt: new Date('2021-01-09'), isStarred: false, status: 'inbox', body: 'Sure, I can make it at 1pm', isRead: true, removedAt: null },
            { id: 'e110', fromEmail: 'john@example.com', fromFullname: 'John Doe', toEmail: 'olivia@example.com', toFullname: 'Olivia Johnson', subject: 'Promotion', sentAt: new Date('2021-01-10'), isStarred: false, status: 'inbox', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e111', fromEmail: 'kate@example.com', fromFullname: 'Kate Smith', toEmail: 'mike@example.com', toFullname: 'Mike Johnson', subject: 'Meet for dinner', sentAt: new Date('2021-01-11'), isStarred: false, status: 'draft', body: 'I have a table reserved at 8pm', isRead: false, removedAt: null },
            { id: 'e112', fromEmail: 'lisa@example.com', fromFullname: 'Lisa Johnson', toEmail: 'nick@example.com', toFullname: 'Nick Smith', subject: 'Social', sentAt: new Date('2021-01-12'), isStarred: false, status: 'sent', body: 'Let\'s meet for drinks tomorrow', isRead: true, removedAt: null },
            { id: 'e113', fromEmail: 'mike@example.com', fromFullname: 'Mike Johnson', toEmail: 'olivia@example.com', toFullname: 'Olivia Johnson', subject: 'Promotion', sentAt: new Date('2021-01-13'), isStarred: false, status: 'trash', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e114', fromEmail: 'nick@example.com', fromFullname: 'Nick Smith', toEmail: 'kate@example.com', toFullname: 'Kate Brown', subject: 'Meet for lunch', sentAt: new Date('2021-01-14'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e115', fromEmail: 'olivia@example.com', fromFullname: 'Olivia Johnson', toEmail: 'harry@example.com', toFullname: 'Harry Johnson', subject: 'Social', sentAt: new Date('2021-01-15'), isStarred: true, status: 'inbox', body: 'Let\'s grab drinks tonight', isRead: false, removedAt: null },
            { id: 'e116', fromEmail: 'peter@example.com', fromFullname: 'Peter Brown', toEmail: 'lisa@example.com', toFullname: 'Lisa Johnson', subject: 'Meet for dinner', sentAt: new Date('2021-01-16'), isStarred: false, status: 'draft', body: 'I have a table reserved at 6pm', isRead: false, removedAt: null },
            { id: 'e117', fromEmail: 'lucy@example.com', fromFullname: 'Lucy Smith', toEmail: 'harry@example.com', toFullname: 'Harry Johnson', subject: 'Social', sentAt: new Date('2021-01-17'), isStarred: false, status: 'inbox', body: 'Let\'s meet for drinks this weekend', isRead: false, removedAt: null },
            { id: 'e118', fromEmail: 'emily@example.com', fromFullname: 'Emily Johnson', toEmail: 'nick@example.com', toFullname: 'Nick Smith', subject: 'Meet for lunch', sentAt: new Date('2021-01-18'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e119', fromEmail: 'jack@example.com', fromFullname: 'Jack Brown', toEmail: 'kate@example.com', toFullname: 'Kate Brown', subject: 'Meet for lunch', sentAt: new Date('2021-01-19'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e120', fromEmail: 'karen@example.com', fromFullname: 'Karen Johnson', toEmail: 'peter@example.com', toFullname: 'Peter Brown', subject: 'Social', sentAt: new Date('2021-01-20'), isStarred: false, status: 'inbox', body: 'Let\'s grab drinks tonight', isRead: false, removedAt: null },
            { id: 'e121', fromEmail: 'laura@example.com', fromFullname: 'Laura Smith', toEmail: 'harry@example.com', toFullname: 'Harry Johnson', subject: 'Meet for dinner', sentAt: new Date('2021-01-21'), isStarred: false, status: 'draft', body: 'I have a table reserved at 7pm', isRead: false, removedAt: null },
            { id: 'e122', fromEmail: 'richard@example.com', fromFullname: 'Richard Johnson', toEmail: 'olivia@example.com', toFullname: 'Olivia Johnson', subject: 'Promotion', sentAt: new Date('2021-01-22'), isStarred: false, status: 'inbox', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e123', fromEmail: 'sarah@example.com', fromFullname: 'Sarah Brown', toEmail: 'mike@example.com', toFullname: 'Mike Johnson', subject: 'Meet for lunch', sentAt: new Date('2021-01-23'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e124', fromEmail: 'taylor@example.com', fromFullname: 'Taylor Smith', toEmail: 'nick@example.com', toFullname: 'Nick Smith', subject: 'Social', sentAt: new Date('2021-01-24'), isStarred: false, status: 'inbox', body: 'Let\'s meet for drinks this weekend', isRead: false, removedAt: null },
            { id: 'e125', fromEmail: 'victoria@example.com', fromFullname: 'Victoria Johnson', toEmail: 'olivia@example.com', toFullname: 'Olivia Johnson', subject: 'Promotion', sentAt: new Date('2021-01-25'), isStarred: false, status: 'inbox', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e126', fromEmail: 'william@example.com', fromFullname: 'William Brown', toEmail: 'kate@example.com', toFullname: 'Kate Brown', subject: 'Meet for lunch', sentAt: new Date('2021-01-26'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e127', fromEmail: 'xavier@example.com', fromFullname: 'Xavier Smith', toEmail: 'harry@example.com', toFullname: 'Harry Johnson', subject: 'Social', sentAt: new Date('2021-01-27'), isStarred: false, status: 'inbox', body: 'Let\'s grab drinks tonight', isRead: false, removedAt: null },
            { id: 'e128', fromEmail: 'yolanda@example.com', fromFullname: 'Yolanda Johnson', toEmail: 'peter@example.com', toFullname: 'Peter Brown', subject: 'Meet for dinner', sentAt: new Date('2021-01-28'), isStarred: false, status: 'draft', body: 'I have a table reserved at 7pm', isRead: false, removedAt: null },
            { id: 'e129', fromEmail: 'zacarias@example.com', fromFullname: 'Zacarias Brown', toEmail: 'lisa@example.com', toFullname: 'Lisa Johnson', subject: 'Meet for lunch', sentAt: new Date('2021-01-29'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e130', fromEmail: 'anne@example.com', fromFullname: 'Anne Smith', toEmail: 'mike@example.com', toFullname: 'Mike Johnson', subject: 'Social', sentAt: new Date('2021-01-30'), isStarred: false, status: 'inbox', body: 'Let\'s meet for drinks this weekend', isRead: false, removedAt: null },
            { id: 'e131', fromEmail: 'ben@example.com', fromFullname: 'Ben Johnson', toEmail: 'olivia@example.com', toFullname: 'Olivia Johnson', subject: 'Promotion', sentAt: new Date('2021-01-31'), isStarred: false, status: 'inbox', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e132', fromEmail: 'charles@example.com', fromFullname: 'Charles Brown', toEmail: 'nick@example.com', toFullname: 'Nick Smith', subject: 'Meet for lunch', sentAt: new Date('2021-02-01'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e133', fromEmail: 'david@example.com', fromFullname: 'David Johnson', toEmail: 'peter@example.com', toFullname: 'Peter Brown', subject: 'Social', sentAt: new Date('2021-02-02'), isStarred: false, status: 'inbox', body: 'Let\'s grab drinks tonight', isRead: false, removedAt: null },
            { id: 'e134', fromEmail: 'elizabeth@example.com', fromFullname: 'Elizabeth Smith', toEmail: 'harry@example.com', toFullname: 'Harry Johnson', subject: 'Meet for dinner', sentAt: new Date('2021-02-03'), isStarred: false, status: 'draft', body: 'I have a table reserved at 7pm', isRead: false, removedAt: null },
            { id: 'e135', fromEmail: 'frank@example.com', fromFullname: 'Frank Johnson', toEmail: 'olivia@example.com', toFullname: 'Olivia Johnson', subject: 'Promotion', sentAt: new Date('2021-02-04'), isStarred: false, status: 'inbox', body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e136', fromEmail: 'george@example.com', fromFullname: 'George Brown', toEmail: 'lisa@example.com', toFullname: 'Lisa Johnson', subject: 'Meet for lunch', sentAt: new Date('2021-02-05'), isStarred: false, status: 'inbox', body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e137', fromEmail: 'heather@example.com', fromFullname: 'Heather Smith', toEmail: 'mike@example.com', toFullname: 'Mike Johnson', subject: 'Social', sentAt: new Date('2021-02-06'), isStarred: false, status: 'inbox', body: 'Let\'s meet for drinks this weekend', isRead: false, removedAt: null },  
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}
