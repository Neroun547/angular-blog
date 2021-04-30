let hash = '';
function generateHash() {
    let hashItems = ['dsf', 'sd', '8', '1', '0', '*', 'h', 'sd', 'dd', 's', 'z', 'n', 'q', 'j'];
    for(let i = 0; i < hashItems.length; i++){
        hash +=  hashItems[Math.floor(Math.random() * hashItems.length)];
    }
    return hash;
}

module.exports = { generateHash, hash };