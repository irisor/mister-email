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
    getLoggedinUser,
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function isLoggedinUser(email) {
    return email === loggedinUser.email
}

function getLoggedinUser() {
    return loggedinUser
}


const STORAGE_KEY = 'mailDB'

_createMails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        emails = emails.filter(email => isInFilter(email, filterBy)
        )
    }
    return emails
}

function isInFilter(email, filterBy) {
    if (!filterBy) return true
    const { status, readStatus, text } = filterBy

    return (isInStatusFilter(email, status)) &&
        (readStatus === 'All' || email.isRead && readStatus === 'Read' || !email.isRead && readStatus === 'Unread') &&
        (!text || email.toFullname.toLowerCase().includes(text.toLowerCase()) || email.fromFullname.toLowerCase().includes(text.toLowerCase()) || email.subject.toLowerCase().includes(text.toLowerCase()) || email.body.toLowerCase().includes(text.toLowerCase()))
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

function createEmail(id = "", fromEmail = loggedinUser.email, fromFullname = loggedinUser.fullname, toEmail = "", toFullname = "", subject = "", status = "draft", body = "", isRead = true, removedAt = null) {
    return {
        id,
        fromEmail,
        fromFullname,
        toEmail,
        toFullname,
        subject,
        status,
        body,
        isRead,
        removedAt,
    }
}

function getDefaultFilter({ folder = 'inbox', readStatus = "All", text = null }) {
    return {
        status: folder,
        readStatus,
        text
    }
}

function isInStatusFilter(email, status) {
    return status === 'All' ||
        status === 'inbox' && email.toEmail === loggedinUser.email && email.sentAt && !email.removedAt && !email.archivedAt ||
        status === 'sent' && email.fromEmail === loggedinUser.email && !email.removedAt && email.sentAt && !email.archivedAt ||
        status === 'starred' && email.isStarred && !email.removedAt && !email.archivedAt ||
        status === 'draft' && !email.sentAt && !email.removedAt && !email.archivedAt ||
        status === 'trash' && email.removedAt && !email.archivedAt ||
        status === 'archive' && email.archivedAt
}

function _createMails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [

            { id: 'e101', fromEmail: 'alice@example.com', fromFullname: 'Alice Smith', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for lunch', sentAt: new Date('2024-06-06T00:00:00'), isStarred: false, body: 'Please join me for lunch today. It has been a while since we last met and I would love to catch up with you. I have ordered a nice dinner for us, so let\'s make it a special occasion. I hope you can make it, I have a few surprises up my sleeve. Let\'s make it a memorable lunch.\n\nBest regards,\nAlice', isRead: true, removedAt: null },
            { id: 'e102', fromEmail: 'bob@example.com', fromFullname: 'Bob Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Re: Meet for lunch', sentAt: new Date('2024-01-02T00:00:00'), isStarred: true, body: 'Sure, I will be there at 2pm. I can\'t wait to see you and enjoy the delicious meal you have prepared. Let\'s make this a day to remember. See you soon,\nBob', isRead: false, removedAt: null },
            { id: 'e103', fromEmail: 'charlie@example.com', fromFullname: 'Charlie Brown', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Promotion', sentAt: new Date('2024-05-28T05:17:22'), isStarred: false, body: 'Congratulations on your promotion! I am thrilled to hear about your success. Your dedication and hard work have not gone unnoticed. I am sure you will continue to excel in your new role. Congratulations to you and Lucy and Snoopy! Let\'s celebrate together.\n\nBest regards,\nCharlie', isRead: false, removedAt: null },
            { id: 'e104', fromEmail: 'user@appsus.com', fromFullname: 'Mahatma Appsus', toEmail: 'john@example.com', toFullname: 'John Doe', subject: 'Meet for dinner', isStarred: false, body: 'I have a table reserved at 7pm. I have planned a lovely evening for us, complete with a bottle of fine wine and a selection of delicious dishes. It will be a relaxing and enjoyable evening. Let\'s make the most of it and create lasting memories. See you soon,\nDave', isRead: true, removedAt: null },
            { id: 'e105', fromEmail: 'eve@example.com', fromFullname: 'Eve Evans', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Social', sentAt: new Date('2021-01-05T00:00:00'), isStarred: false, body: 'Let\'s meet for cocktails at 9pm', isRead: true, removedAt: null },
            { id: 'e106', fromEmail: 'frank@example.com', fromFullname: 'Frank Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Promotion', sentAt: new Date('2021-01-06T00:00:00'), isStarred: false, body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e107', fromEmail: 'user@appsus.com', fromFullname: 'Mahatma Appsus', toEmail: 'user@appsus.com', toFullname: 'Harry Johnson', subject: 'Meet for lunch', sentAt: new Date('2021-01-07T00:00:00'), isStarred: false, body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e108', fromEmail: 'user@appsus.com', fromFullname: 'Mahatma Appsus', toEmail: 'george@example.com', toFullname: 'George Smith', subject: 'Social', sentAt: new Date('2021-01-08'), isStarred: true, body: 'Let\'s grab drinks tonight', isRead: true, removedAt: null },
            { id: 'e109', fromEmail: 'user@appsus.com', fromFullname: 'Mahatma Appsus', toEmail: 'nick@example.com', toFullname: 'Nick Smith', subject: 'Re: Meet for lunch', sentAt: new Date('2021-01-09'), isStarred: false, body: 'Sure, I can make it at 1pm', isRead: true, removedAt: null },
            { id: 'e110', fromEmail: 'john@example.com', fromFullname: 'John Doe', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Promotion', sentAt: new Date('2021-01-10'), isStarred: false, body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e111', fromEmail: 'user@appsus.com', fromFullname: 'Mahatma Appsus', toEmail: 'kate@example.com', toFullname: 'Kate Smith', subject: 'Meet for dinner', isStarred: false, body: 'I have a table reserved at 8pm', isRead: false, removedAt: null },
            { id: 'e112', fromEmail: 'lisa@example.com', fromFullname: 'Lisa Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Social', sentAt: new Date('2021-01-12'), isStarred: false, body: 'Let\'s meet for drinks tomorrow', isRead: true, removedAt: null },
            { id: 'e113', fromEmail: 'mike@example.com', fromFullname: 'Mike Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Promotion', sentAt: new Date('2021-01-13'), isStarred: false, body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e114', fromEmail: 'nick@example.com', fromFullname: 'Nick Smith', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for lunch', sentAt: new Date('2021-01-14'), isStarred: false, body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e115', fromEmail: 'olivia@example.com', fromFullname: 'Olivia Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Social', sentAt: new Date('2021-01-15'), isStarred: true, body: 'Let\'s grab drinks tonight', isRead: false, removedAt: null },
            { id: 'e116', fromEmail: 'user@appsus.com', fromFullname: 'Mahatma Appsus', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for dinner', isStarred: false, body: 'I have a table reserved at 6pm', isRead: false, removedAt: null },
            { id: 'e117', fromEmail: 'lucy@example.com', fromFullname: 'Lucy Smith', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Social', sentAt: new Date('2021-01-17'), isStarred: false, body: 'Let\'s meet for drinks this weekend', isRead: false, removedAt: null },
            { id: 'e118', fromEmail: 'emily@example.com', fromFullname: 'Emily Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for lunch', sentAt: new Date('2021-01-18'), isStarred: false, body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e119', fromEmail: 'jack@example.com', fromFullname: 'Jack Brown', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for lunch', sentAt: new Date('2021-01-19'), isStarred: false, body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e120', fromEmail: 'karen@example.com', fromFullname: 'Karen Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Social', sentAt: new Date('2021-01-20'), isStarred: false, body: 'Let\'s grab drinks tonight', isRead: false, removedAt: null },
            { id: 'e121', fromEmail: 'user@appsus.com', fromFullname: 'Mahatma Appsus', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for dinner', isStarred: false, body: 'I have a table reserved at 7pm', isRead: false, removedAt: null },
            { id: 'e122', fromEmail: 'richard@example.com', fromFullname: 'Richard Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Promotion', sentAt: new Date('2021-01-22'), isStarred: false, body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e123', fromEmail: 'sarah@example.com', fromFullname: 'Sarah Brown', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for lunch', sentAt: new Date('2021-01-23'), isStarred: false, body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e124', fromEmail: 'taylor@example.com', fromFullname: 'Taylor Smith', toEmail: 'user@appsus.com', toFullname: 'NMahatma Appsus', subject: 'Social', sentAt: new Date('2021-01-24'), isStarred: false, body: 'Let\'s meet for drinks this weekend', isRead: false, removedAt: null },
            { id: 'e125', fromEmail: 'victoria@example.com', fromFullname: 'Victoria Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Promotion', sentAt: new Date('2021-01-25'), isStarred: false, body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e126', fromEmail: 'william@example.com', fromFullname: 'William Brown', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for lunch', sentAt: new Date('2021-01-26'), isStarred: false, body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e127', fromEmail: 'xavier@example.com', fromFullname: 'Xavier Smith', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Social', sentAt: new Date('2021-01-27'), isStarred: false, body: 'Let\'s grab drinks tonight', isRead: false, removedAt: null },
            { id: 'e128', fromEmail: 'user@appsus.com', fromFullname: 'Mahatma Appsus', toEmail: 'yolanda@example.com', toFullname: 'Yolanda Johnson', subject: 'Meet for dinner', isStarred: false, body: 'I have a table reserved at 7pm', isRead: false, removedAt: null },
            { id: 'e129', fromEmail: 'zacarias@example.com', fromFullname: 'Zacarias Brown', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for lunch', sentAt: new Date('2021-01-29'), isStarred: false, body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e130', fromEmail: 'anne@example.com', fromFullname: 'Anne Smith', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Social', sentAt: new Date('2021-01-30'), isStarred: false, body: 'Let\'s meet for drinks this weekend', isRead: false, removedAt: null },
            { id: 'e131', fromEmail: 'ben@example.com', fromFullname: 'Ben Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Promotion', sentAt: new Date('2021-01-31'), isStarred: false, body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e132', fromEmail: 'charles@example.com', fromFullname: 'Charles Brown', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for lunch', sentAt: new Date('2021-02-01'), isStarred: false, body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e133', fromEmail: 'david@example.com', fromFullname: 'David Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Social', sentAt: new Date('2021-02-02'), isStarred: false, body: 'Let\'s grab drinks tonight', isRead: false, removedAt: null },
            { id: 'e134', fromEmail: 'elizabeth@example.com', fromFullname: 'Elizabeth Smith', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for dinner', sentAt: new Date('2021-02-03'), isStarred: false, body: 'I have a table reserved at 7pm', isRead: false, removedAt: null },
            { id: 'e135', fromEmail: 'frank@example.com', fromFullname: 'Frank Johnson', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Promotion', sentAt: new Date('2021-02-04'), isStarred: false, body: 'Congratulations on your promotion', isRead: false, removedAt: null },
            { id: 'e136', fromEmail: 'george@example.com', fromFullname: 'George Brown', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Meet for lunch', sentAt: new Date('2021-02-05'), isStarred: false, body: 'Please join me for lunch today', isRead: false, removedAt: null },
            { id: 'e137', fromEmail: 'heather@example.com', fromFullname: 'Heather Smith', toEmail: 'user@appsus.com', toFullname: 'Mahatma Appsus', subject: 'Social', sentAt: new Date('2021-02-06'), isStarred: false, body: 'Let\'s meet for drinks this weekend', isRead: false, removedAt: null },
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}
