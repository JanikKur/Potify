const audioFileTypes = {
    "mp3" : 1,
    "aac": 1,
    "aif": 1,
    "flac" : 1,
    "iff" : 1,
    "m4a" : 1,
    "m4b" : 1,
    "mid" : 1,
    "midi" : 1,
    "mpa" : 1,
    "mpc" : 1,
    "oga" : 1,
    "ogg" : 1,
    "opus" : 1,
    "ra" : 1,
    "ram" : 1,
    "snd" : 1,
    "wav" : 1,
    "wma": 1
}
export function checkPodcastFile(file){
    const extension = getFileExtension(file.name);
    return audioFileTypes[extension];
}

function getFileExtension(file){
    const fileParts = file.split('.');
    return fileParts[fileParts.length - 1];
}