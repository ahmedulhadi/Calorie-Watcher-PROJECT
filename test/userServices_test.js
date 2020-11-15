const expect = require('chai').expect;
// import userServices
const userServices = require('../services/userServices');

describe('userServices.js tests', () => {
    describe('userServices.isUserExist() Test', () => {
        it('should work', () => {
            userServices.isUserExist("test@test.in")
            .then(
                function(result){
                    console.log("test: " + result);
                    expect(result).to.equal(true);
                }
            );
        });
        
    });

    // describe('userServices.authenticateUser() Test', () => {
    //     it('should equal true', () => {
    //         const result = userServices.authenticateUser({
    //             email: "test@test.in",
    //             password: "password"
    //         });
    //         expect(result).to.equal(false);
    //     });
    // });

    describe('userServices.validateEmail() Test', () => {
        it('should equal true', () => {
            const result = userServices.validateEmail("t1@test.com");
            expect(result).to.equal(true);
        });
    });
});