# Instructions for AI Tools and Development Guidelines

Keep it simple!

## 1. Embrace Simplicity Over Cleverness

- Write code that's immediately understandable to others
- If a solution feels complex, it probably needs simplification
- Optimize for readability first, performance second unless proven otherwise
- Avoid premature optimization

```javascript
// Avoid clever one-liners
// Bad
const findPrimes = (maxNum) =>
  [...Array(maxNum)]
    .map((_, i) => i)
    .filter(
      (n) => ![...Array(n)].map((_, i) => i + 2).some((i) => n % i === 0),
    );

// Good
function findPrimeNumbers(maxNum) {
  const primes = [];
  for (let number = 2; number < maxNum; number++) {
    if (isPrime(number)) {
      primes.push(number);
    }
  }
  return primes;
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
```

## 2. Focus on Core Functionality

- Start with the minimum viable solution
- Question every feature: "Is this really necessary?"
- Build incrementally based on actual needs, not hypothetical ones
- Delete unnecessary code and features

```javascript
// Bad: Overengineered from the start
class UserManager {
  constructor(db, cache, logger, metrics, notificationService) {
    this.db = db;
    this.cache = cache;
    this.logger = logger;
    this.metrics = metrics;
    this.notification = notificationService;
  }
}

// Good: Start simple, expand when needed

class UserManager {
  /**
   * @param {Database} db - The database instance
   */
  constructor(db) {
    this.db = db;
  }
}
```

## 3. Always Add JSDoc Comments with Descriptive Types

- Document functions, classes, and modules
- Use type inference when possible
- Describe parameters, return values, and side effects
- Keep comments up to date with code changes
- Import types from external modules when needed
- Create typedefs for complex types

```javascript
/**
 * Returns the sum of two numbers.
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} The sum of the two numbers
 */

function add(a, b) {
  return a + b;
}
```

## 4. Leverage Existing Solutions

- Use standard libraries whenever possible
- Don't reinvent the wheel
- Choose well-maintained, popular libraries for common tasks
- Keep dependencies minimal but practical

```javascript
// Bad: Custom implementation
function parseJsonFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  // Custom parsing logic...
}

// Good: Use standard library
function readConfig(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
```

## 5. Function Design

- Each function should have a single responsibility
- Keep functions short (typically under 20 lines)
- Use descriptive names that indicate purpose
- Limit number of parameters (3 or fewer is ideal)

```javascript
// Bad: Multiple responsibilities
function processUserData(userData) {
  if (validateUser(userData)) {
    saveToDatabase(userData);
    sendWelcomeEmail(userData);
    updateMetrics(userData);
  }
}

// Good: Single responsibility
function saveUser(userData) {
  if (!userData) {
    throw new Error("User data cannot be empty");
  }
  return database.insert("users", userData);
}
```

## 6. Project Structure

- Keep related code together
- Use consistent file organization
- Maintain a flat structure where possible
- Group by feature rather than type

```plaintext
# Good project structure
project/
├── main.js
├── config.js
├── users/
│   ├── models.js
│   ├── services.js
│   └── tests/
└── utils/
    └── helpers.js
```

## 7. Code Review Guidelines

- Review for simplicity first
- Question complexity and overengineering
- Look for duplicate code and abstraction opportunities
- Ensure consistent style and naming conventions

## 8. Maintenance Practices

- Regularly remove unused code
- Keep dependencies updated
- Refactor when code becomes unclear
- Document only what's necessary and likely to change

Remember:

- Simple code is easier to maintain and debug
- Write code for humans first, computers second
- Add complexity only when justified by requirements
- If you can't explain your code simply, it's probably too complex

## Development Guidelines

- Complexity is what kills you
- Make scripts executable
- Don't add any comments unless they really are needed for explaining the why
- Use descriptive, meaningful names for variables, functions, and classes
- Group related code together
- Use consistent indentation (2 spaces recommended for JavaScript)
- Add spacing between logical sections
- Handle potential errors explicitly
- Validate input data
- Return meaningful error messages
- Use consistent formatting
- Avoid deep nesting of conditionals

## Debugging Approach

### 1. Figure Out the Symptoms

- Understand the incorrect behavior
- Review error messages and stack traces
- Reproduce the issue in your development environment
- Document the steps to reproduce

### 2. Reproduce the Bug

- Create a minimal test case
- Identify the exact conditions that trigger the issue
- Document environment details (Node.js version, browser, etc.)

### 3. Understand the System

- Review the relevant code and dependencies
- Check recent changes that might have introduced the bug
- Understand component interactions

### 4. Form a Hypothesis

- Based on symptoms and system knowledge, form theories
- Identify potential problem areas
- Plan your debugging approach

### 5. Test Your Hypothesis

- Add strategic console.logs or debugger statements
- Use browser dev tools or Node.js debugger
- Validate assumptions about data flow
- Test fixes in isolation before implementing

## Object-Oriented Programming Guidelines

### 1. Single Responsibility Principle

Each class should have one clear purpose and reason to change.

```javascript
// Bad
class UserManager {
  saveUser(user) {}
  sendEmail(user) {}
  generateReport() {}
}

// Good
class UserRepository {
  saveUser(user) {}
}

class EmailService {
  sendEmail(user) {}
}

class ReportGenerator {
  generateReport() {}
}
```

### 2. Encapsulation

Hide internal details and provide a clean interface.

```javascript
class BankAccount {
  #balance;

  constructor() {
    this.#balance = 0;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

### 3. Clear Constructor Initialization

Initialize all attributes in the constructor.

```javascript
class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.orders = [];
    this.totalSpent = 0;
  }
}
```

### 4. Favor Composition Over Inheritance

```javascript
// Bad
class SupermarketItem extends ElectronicDevice {
  constructor() {
    super();
    this.perishable = true;
    this.taxable = true;
  }
}

// Good
class SupermarketItem {
  constructor() {
    this.electronic = new ElectronicProperties();
    this.perishable = new PerishableProperties();
    this.tax = new TaxProperties();
  }
}
```

### 5. Make Dependencies Explicit

```javascript
// Bad
class OrderService {
  processOrder(order) {
    const emailer = new EmailService();
    emailer.sendConfirmation(order);
  }
}

// Good
class OrderService {
  constructor(emailService) {
    this.emailService = emailService;
  }

  processOrder(order) {
    this.emailService.sendConfirmation(order);
  }
}
```

### 6. Use TypeScript for Strong Types

```typescript
interface Item {
  id: string;
  price: number;
  name: string;
}

class ShoppingCart {
  private items: Item[] = [];

  addItem(item: Item): void {
    this.items.push(item);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
```

### 7. Keep Methods Short and Focused

```javascript
class OrderProcessor {
  processOrder(order) {
    this.validateOrder(order);
    const total = this.calculateTotal(order);
    this.applyDiscounts(order);
    this.updateInventory(order);
    this.sendConfirmation(order);
  }
}
```

## Testing Best Practices

1. Write tests first (TDD) when possible
2. Test public interfaces, not implementation details
3. Use meaningful test names that describe the scenario
4. Keep tests independent and isolated
5. Test edge cases and error conditions

```javascript
// Using Jest
describe("BankAccount", () => {
  test("throws error when withdrawing more than balance", () => {
    const account = new BankAccount();
    account.deposit(100);

    expect(() => {
      account.withdraw(150);
    }).toThrow("Insufficient funds");
  });
});
```

## Common Anti-Patterns to Avoid

1. God Classes: Classes that do too much
2. Feature Envy: Methods that use more features of other classes than their own
3. Long Parameter Lists: Methods with too many parameters
4. Tight Coupling: Classes that know too much about each other
5. Premature Optimization: Making code complex for theoretical performance gains
