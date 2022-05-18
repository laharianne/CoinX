require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.9',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/cheYdbczvf7EZFCp_4gQX9LOIupPuG0y',
      accounts: ['80a9857f8c264590b26da8db04951f110421003d83aa3fbd9a9b4ad181334fb3'],
    },
  },
};