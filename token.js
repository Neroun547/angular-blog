let token = '';
const itemToken = ['sc@34', 'df%342', 'dfs', '213', "sdcs", 's', 'bvv', 'udf', 'r', '*&%', 'dggfd']; 
for(let i = 0; i < itemToken.length; i++){
    const randomToken = itemToken[Math.floor(Math.random() * itemToken.length)];
    token += randomToken;
}

module.exports = { token };