import * as utils from './utils'

describe('Password validation', () => {
    test('pass123 to be valid', () => {
        expect(utils.validatePassword('Pass123')).toBeTruthy();
    })
    test('pass123 to be invalid. Needs 1 uppercase', () => {
        expect(utils.validatePassword('pass123')).toBe('Enter 1 uppercase!');
    });
    test('Password to be invalid. Needs 1 symbol', () => {
        expect(utils.validatePassword('Password')).toBe('Enter 1 symbol!');
    });
    test('pass123 to be invalid. Needs 1 lowercase', () => {
        expect(utils.validatePassword('PASSWORD1')).toBe('Enter 1 lowercase!');
    });
    test('pass123 to be invalid. Needs 3 more symbols', () => {
        expect(utils.validatePassword('Pas1')).toBe('You must enter at least 7 symbols! 3 symbols remaining!');
    });
});


describe('Password to match', () => {
    test('Passwords match', () => {
        expect(utils.confirmPasswords('Pass123', 'Pass123')).toBeTruthy();
    })
    test('Passwords does not match', () => {
        expect(utils.confirmPasswords('Pass123', 'Pass223')).toBe("Passwords does not match!");
    })
});


describe('Valid email address', () => {
    test('Valid email', () => {
        expect(utils.validateEmail('Stefan@gmail.com')).toBeTruthy()
    })
    test('Email not valid', () => {
        expect(utils.validateEmail('Stefangmail.com')).toBe('Only e-mail is accepted!')
    })
    test('Email not valid', () => {
        expect(utils.validateEmail('')).toBe("Email is required!")
    })
});

describe('Check input length', () => {
    test('Check input with more than allowed length', () => {
        expect(utils.validateLength('Stefan', 5)).toBeFalsy();
    })
    test('Check input not more than allowed length', () => {
        expect(utils.validateLength('Edi', 5)).toBeTruthy()
    })
});

describe('Test if user data meets requirements', () => {
    test('Test shorter username flag', () => {
        expect(utils.validateRequirements({
            username: 'Ed',
            age: 24,
            phone: '0888888888'
    })).toBeTruthy()
    })
    test('test younger user flag', () => {
        expect(utils.validateRequirements({
            username: 'Edi',
            age: 16,
            phone: '0888888888'
    })).toBeTruthy()
    })
    test('test shorter number flag', () => {
        expect(utils.validateRequirements({
            username: 'Edi',
            age: 26,
            phone: '08888888'
    })).toBeTruthy()
    })
    test('test invalid number format flag', () => {
        expect(utils.validateRequirements({
            username: 'Edi',
            age: 26,
            phone: '9888888800'
    })).toBeTruthy()
    })
    test('all valid properties', () => {
        expect(utils.validateRequirements({
            username: 'Edi',
            age: 26,
            phone: '0888888800'
    })).toBeFalsy();
    })

});