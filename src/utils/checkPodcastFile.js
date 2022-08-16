const audioFileTypes = {
    "mp3": 1,
    "aac": 1,
    "aif": 1,
    "flac": 1,
    "iff": 1,
    "m4a": 1,
    "m4b": 1,
    "mid": 1,
    "midi": 1,
    "mpa": 1,
    "mpc": 1,
    "oga": 1,
    "ogg": 1,
    "opus": 1,
    "ra": 1,
    "ram": 1,
    "snd": 1,
    "wav": 1,
    "wma": 1
}
const imageFileTypes = {
    "jpeg": 1,
    "jpg": 1,
    "png": 1,
    "gif": 1,
    "tiff": 1,
    "tif": 1,
    "webp": 1,
    "bmp": 1
}


export function isPodcastFile(file) {
    const extension = getFileExtension(file.name);
    return audioFileTypes[extension.toLowerCase()];
}

export function isImageFile(file) {
    const extension = getFileExtension(file.name);
    return imageFileTypes[extension.toLowerCase()];
}

function getFileExtension(filename) {
    const fileParts = filename.split('.');
    return fileParts[fileParts.length - 1];
}

