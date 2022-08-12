const uuid = require('uuid');

module.exports = function saveFile(req, res, next) {
    if (req.files) {
        let fileLinks = [];
        if (req.files.file.length) {
            for (let file of req.files.file) {
                const fileParts = file.name.split('.');
                const extension = fileParts[fileParts.length - 1];
                let fileLink = '';
                if (isImage(extension)) {
                    fileLink = `/images/${uuid.v4()}.${extension}`
                    file.mv(`${__dirname}/../public${fileLink}`);
                } else {
                    fileLink = `${uuid.v4()}.${extension}`
                    file.mv(`${__dirname}/../public/podcasts/${fileLink}`);
                }
                fileLinks.push(fileLink);
            }
        } else {
            let file = req.files.file;
            const fileParts = file.name.split('.');
            const extension = fileParts[fileParts.length - 1];
            let fileLink = '';
            if (isImage(extension)) {
                fileLink = `/images/${uuid.v4()}.${extension}`
                file.mv(`${__dirname}/../public${fileLink}`);
            } else {
                console.log(file.duration);
                fileLink = `${uuid.v4()}.${extension}`
                file.mv(`${__dirname}/../public/podcasts/${fileLink}`);
            }
            fileLinks.push(fileLink);
        }
        req.body.fileLinks = fileLinks;
    }
    next();
}


function isImage(extension) {
    if (extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'gif' || extension === 'webp' || extension === 'bmp') {
        return true;
    }
    return false;
}