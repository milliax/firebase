const { GoogleSpreadsheet } = require('google-spreadsheet')

async function find(url, rows) {
    for (const row of rows) {
        if (row['link'] === url) {
            return row['shrink']
        }
    }
    return 0;
}

async function find_token(token, rows) {
    for (const row of rows) {
        if (row['shrink'] === token) {
            return row['link']
        }
    }
    return 0;
}

async function getData(url, token) {
    const creds = require('../credentials/sivir-pw.json')
    const doc = new GoogleSpreadsheet(functions.config().googlesheet.item)
    await doc.useServiceAccountAuth(creds)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]

    const rows = await sheet.getRows()

    const data = await find(url, rows);
    if (data !== 0) {
        return data
    }
    const length = rows.length
    // data haven't added
    await sheet.loadCells(`A${length + 2}:B${length + 2}`)
    const cellShrink = sheet.getCellByA1(`A${length + 2}`)
    const cellLink = sheet.getCellByA1(`B${length + 2}`)
    cellShrink.value = token
    cellLink.value = url
    await sheet.saveUpdatedCells()
    return token
}

async function getOnly(token) {
    const creds = require('../credentials/sivir-pw.json')
    const doc = new GoogleSpreadsheet(functions.config().googlesheet.item)
    await doc.useServiceAccountAuth(creds)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()
    const data = await find_token(token, rows);
    if (data !== 0) {
        return data
    }
    return 0
}

module.exports = {
    getData, getOnly
};