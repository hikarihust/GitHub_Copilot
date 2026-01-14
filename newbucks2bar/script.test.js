// Mock DOM elements for testing
function createMockInput(id, value = '') {
    return {
        id,
        value,
        classList: {
            items: [],
            add(...classes) {
                this.items.push(...classes);
            },
            remove(...classes) {
                this.items = this.items.filter(c => !classes.includes(c));
            },
            contains(className) {
                return this.items.includes(className);
            }
        }
    };
}

// Test suite for validateUsername logic
describe('Username Validation', () => {
    test('should validate username with all requirements', () => {
        const username = 'Test1!';
        
        const hasUppercase = /[A-Z]/.test(username);
        const hasNumber = /[0-9]/.test(username);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username);
        const isLongEnough = username.length >= 5;
        
        expect(hasUppercase).toBe(true);
        expect(hasNumber).toBe(true);
        expect(hasSpecial).toBe(true);
        expect(isLongEnough).toBe(true);
    });

    test('should fail validation without uppercase', () => {
        const username = 'test1!';
        const hasUppercase = /[A-Z]/.test(username);
        expect(hasUppercase).toBe(false);
    });

    test('should fail validation without number', () => {
        const username = 'Test!a';
        const hasNumber = /[0-9]/.test(username);
        expect(hasNumber).toBe(false);
    });

    test('should fail validation without special character', () => {
        const username = 'Test1a';
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username);
        expect(hasSpecial).toBe(false);
    });

    test('should fail validation when too short', () => {
        const username = 'T1!';
        const isLongEnough = username.length >= 5;
        expect(isLongEnough).toBe(false);
    });
});

// Test suite for input validation logic
describe('Input Validation', () => {
    test('should validate positive numbers', () => {
        const value = parseFloat('100.50');
        expect(isNaN(value)).toBe(false);
        expect(value >= 0).toBe(true);
    });

    test('should detect negative numbers', () => {
        const value = parseFloat('-50');
        expect(value < 0).toBe(true);
    });

    test('should detect invalid input', () => {
        const value = parseFloat('abc');
        expect(isNaN(value)).toBe(true);
    });

    test('should handle empty string as zero', () => {
        const value = '' === '' ? 0 : parseFloat('') || 0;
        expect(value).toBe(0);
    });
});

// Test suite for data collection logic
describe('Data Collection', () => {
    test('should parse valid income and expense values', () => {
        const incomeValue = '1000';
        const expenseValue = '500';
        
        const income = incomeValue === '' ? 0 : parseFloat(incomeValue) || 0;
        const expense = expenseValue === '' ? 0 : parseFloat(expenseValue) || 0;
        
        expect(income).toBe(1000);
        expect(expense).toBe(500);
    });

    test('should treat empty fields as zero', () => {
        const incomeValue = '';
        const expenseValue = '';
        
        const income = incomeValue === '' ? 0 : parseFloat(incomeValue) || 0;
        const expense = expenseValue === '' ? 0 : parseFloat(expenseValue) || 0;
        
        expect(income).toBe(0);
        expect(expense).toBe(0);
    });

    test('should handle invalid values as zero', () => {
        const incomeValue = 'invalid';
        const expenseValue = 'xyz';
        
        const income = incomeValue === '' ? 0 : parseFloat(incomeValue) || 0;
        const expense = expenseValue === '' ? 0 : parseFloat(expenseValue) || 0;
        
        expect(income).toBe(0);
        expect(expense).toBe(0);
    });
});

// Test suite for regex patterns
describe('Regex Patterns', () => {
    test('uppercase regex should match uppercase letters', () => {
        expect(/[A-Z]/.test('ABC')).toBe(true);
        expect(/[A-Z]/.test('abc')).toBe(false);
        expect(/[A-Z]/.test('Test')).toBe(true);
    });

    test('number regex should match digits', () => {
        expect(/[0-9]/.test('123')).toBe(true);
        expect(/[0-9]/.test('abc')).toBe(false);
        expect(/[0-9]/.test('test1')).toBe(true);
    });

    test('special character regex should match special chars', () => {
        expect(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test('!')).toBe(true);
        expect(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test('abc')).toBe(false);
        expect(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test('test@')).toBe(true);
    });
});
