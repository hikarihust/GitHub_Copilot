// Import the function to test
const { validateUsername } = require('./script.js');

describe('validateUsername', () => {
    let usernameInput;

    beforeEach(() => {
        // Set up DOM elements
        document.body.innerHTML = `
            <input type="text" id="username" />
        `;
        usernameInput = document.getElementById('username');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should return false for empty username and remove validation classes', () => {
        usernameInput.value = '';
        usernameInput.classList.add('is-valid', 'is-invalid');
        
        const result = validateUsername();
        
        expect(result).toBe(false);
        expect(usernameInput.classList.contains('is-valid')).toBe(false);
        expect(usernameInput.classList.contains('is-invalid')).toBe(false);
    });

    test('should return false for username without uppercase letter', () => {
        usernameInput.value = 'test1@';
        
        const result = validateUsername();
        
        expect(result).toBe(false);
        expect(usernameInput.classList.contains('is-invalid')).toBe(true);
        expect(usernameInput.classList.contains('is-valid')).toBe(false);
    });

    test('should return false for username without number', () => {
        usernameInput.value = 'Test@#';
        
        const result = validateUsername();
        
        expect(result).toBe(false);
        expect(usernameInput.classList.contains('is-invalid')).toBe(true);
        expect(usernameInput.classList.contains('is-valid')).toBe(false);
    });

    test('should return false for username without special character', () => {
        usernameInput.value = 'Test123';
        
        const result = validateUsername();
        
        expect(result).toBe(false);
        expect(usernameInput.classList.contains('is-invalid')).toBe(true);
        expect(usernameInput.classList.contains('is-valid')).toBe(false);
    });

    test('should return false for username shorter than 5 characters', () => {
        usernameInput.value = 'T1@';
        
        const result = validateUsername();
        
        expect(result).toBe(false);
        expect(usernameInput.classList.contains('is-invalid')).toBe(true);
        expect(usernameInput.classList.contains('is-valid')).toBe(false);
    });

    test('should return false for username with multiple validation failures', () => {
        usernameInput.value = 'test';
        
        const result = validateUsername();
        
        expect(result).toBe(false);
        expect(usernameInput.classList.contains('is-invalid')).toBe(true);
        expect(usernameInput.classList.contains('is-valid')).toBe(false);
    });

    test('should return true for valid username meeting all requirements', () => {
        usernameInput.value = 'Test1@';
        
        const result = validateUsername();
        
        expect(result).toBe(true);
        expect(usernameInput.classList.contains('is-valid')).toBe(true);
        expect(usernameInput.classList.contains('is-invalid')).toBe(false);
    });

    test('should return true for valid username with longer length', () => {
        usernameInput.value = 'MyUser123!';
        
        const result = validateUsername();
        
        expect(result).toBe(true);
        expect(usernameInput.classList.contains('is-valid')).toBe(true);
        expect(usernameInput.classList.contains('is-invalid')).toBe(false);
    });

    test('should accept various special characters', () => {
        const validUsernames = ['Test1!', 'Test1@', 'Test1#', 'Test1$', 'Test1%'];
        
        validUsernames.forEach(username => {
            usernameInput.value = username;
            const result = validateUsername();
            expect(result).toBe(true);
        });
    });

    test('should remove is-invalid class when username becomes valid', () => {
        usernameInput.value = 'test';
        usernameInput.classList.add('is-invalid');
        
        usernameInput.value = 'Test1@';
        const result = validateUsername();
        
        expect(result).toBe(true);
        expect(usernameInput.classList.contains('is-invalid')).toBe(false);
        expect(usernameInput.classList.contains('is-valid')).toBe(true);
    });
});
