---
title: Table Driven Testing with TypeScript
description:
  Table driven tests provide a robust approach to writing unit tests by removing
  duplication, as well as improving readability and maintanability of your
  tests.
head:
  - - meta
    - property: 'keywords'
      content:
        'table driven testing, table tests, tdt, typescript, go, ava, javascript'
  - - meta
    - property: 'og:image'
      content: https://goodenough.nz/thumbnails/table-driven-testing-with-typescript.png
date: 2023-02-23
author: Brendan Goodenough
thumbnail: /thumbnails/table-driven-testing-with-typescript.png
---

# Table Driven Testing with TypeScript

Software testing is a crucial part of any development process. It ensures that
the software works as intended and helps us to build robust, resilient software.
While unit testing is important, it can be time consuming to write and maintain
individual test cases. Table driven tests offer an alternative approach for unit
testing that can streamline the process entirely. In this blog post, we'll
explore what table driven tests are and how to use them with TypeScript.

_Note: I will be using [AVA][2] for writing the tests in my examples due to its
simplicity. Jest or any other preferred testing framework you have will work
too._

## What is Table Driven Testing?

Table driven testing is a strategy that encourages the reuse of test logic. We
define each case as an entry in an array, specifying our inputs and expected
result. We then execute each case against a generic call to the function we are
testing. This helps us avoid duplication of test logic, and helps to make our
tests:

- Concise and readable: Easier to see what your tests are covering, their
  inputs, and what the expected output values should be.
- Easy to maintain: Promotes the reuse of test code and helps avoid duplication.
  New test cases are added to the array, no need to duplicate test logic.

Table driven tests aren’t new. Most commonly used by Go developers, you’ll find
[blog posts][0] throughout the Go community encouraging their use, and the
concept is even introduced in some Go beginner’s and reference [guides][1].

While table driven tests are most popular with Go, TypeScript is also a perfect
language for them. Being a strongly-typed superset of JavaScript, TypeScript
allows us to explicitly define our input and expected types, an important
feature to have when we are writing our tests.

## Thinking in Tables

An easy way to start writing table driven tests is to think of the cases you
want to test and list them in a table. Each case consists of at least a name,
input arguments, and an expected result.

Consider the following function that calculates the sum of two numbers:

```ts
function sum(a: number, b: number): number {
  return a + b
}
```

We want to write tests that ensure our sum function returns the correct result,
no matter what numbers we provide. For the sake of keeping this post to the
point, I'm just going to include two test cases:

| Test Case                               | Input "a" | Input "b" | Expected Result |
| --------------------------------------- | --------- | --------- | --------------- |
| returns the sum of two positive numbers | 1         | 2         | 3               |
| returns the sum of two negative numbers | -1        | -2        | -3              |

We can already see that each case takes the same input and return types, so why
would duplicate the test logic? Let's take a look and compare conventional vs
table driven unit tests.

You'll also notice that the table serves as a list of requirements for our
function. This is especially useful if you're following a test driven
development (TDD) process, in which case it's best to write this table _before_
implementing your function.

## Conventional Unit Tests

Writing conventional tests for each case above requires duplicating test logic
for each case. You might be using a test framework that encourages test suites
with nested `describe` blocks, but here is how we would write our tests when
using [AVA][2]:

```ts
import test from 'ava'
import { sum } from './math'

test('returns the sum of two positive numbers', (t) => {
  const result = sum(1, 2)
  t.is(result, 3)
}

test('returns the sum of two negative numbers', (t) => {
  const result = sum(-1, -2)
  t.is(result, -3)
}
```

While this example is quite simple, you can see that we are already starting to
repeat code in each test case. This code duplication will quickly add up,
impeding both readability and maintability.

## Table Driven Tests

Table driven tests, on the other hand, require us to translate the cases we
wrote down in our table to TypeScript. This means we need to define a `TestCase`
type, and an array of our test cases.

### Basic Example

Based on our table above, we know that a `TestCase` should have a name, inputs
for `a` and `b`, as well as our expected result.

```ts
type TestCase = {
  name: string
  a: number
  b: number
  expected: number
}
```

Now that we have defined how a test case looks, we can populate our array of
test cases directly from our table.

```ts
const testCases: TestCase[] = [
  {
    name: 'returns the sum of two positive numbers',
    a: 1,
    b: 2,
    expected: 3
  },
  {
    name: 'returns the sum of two negative numbers',
    a: -1,
    b: -2
    expected: -3
  }
]
```

With the test cases defined, the file step is to run a test for each case by
generically calling our `sum` function and verifying the result.

```ts
testCases.forEach((testCase) =>
  test(testCase.name, (t) => {
    const actual = sum(testCase.a, testCase.b)
    t.is(actual, testCase.expected)
  })
)
```

Here you can see we loop through each case, define a test with the `name` of the
case, call `sum` with our input values, and compare our `expected` value with
the actual result.

Putting it all together:

```ts
import test from 'ava'
import { sum } from './math'

type TestCase = {
  name: string
  a: number
  b: number
  expected: number
}

const testCases: TestCase[] = [
  {
    name: 'returns the sum of two positive numbers',
    a: 1,
    b: 2,
    expected: 3
  },
  {
    name: 'returns the sum of two negative numbers',
    a: -1,
    b: -2
    expected: -3
  }
]

testCases.forEach((testCase) =>
  test(testCase.name, (t) => {
    const actual = sum(testCase.a, testCase.b)
    t.is(actual, testCase.expected)
  })
)
```

The test logic we have implemented is generic, and we have avoided any
duplication. On top of this, any new case we want to test can be appended to our
array of test cases, there is no extra logic to write.

### Expecting Errors

Let's pretend we want a function to return the sum of positive numbers only. If
either input `a` or `b` are negative, we will throw an error. Our table of test
cases (again, minimal for simplicity of this article) looks like this:

| Test Case                                 | "a" | "b" | Expected | Error Message        |
| ----------------------------------------- | --- | --- | -------- | -------------------- |
| returns the sum of two positive numbers   | 1   | 2   | 3        |                      |
| throws an error when `a` is less than one | 0   | 2   |          | `a must be positive` |
| throws an error when `b` is less than one | 1   | 0   |          | `b must be positive` |

We can now write a new function that meets the test cases we have defined.

```ts
function sumPositivesOnly(a: number, b: number): number {
  if (a < 1) {
    throw new Error('a must be positive')
  }
  if (b < 1) {
    throw new Error('b must be positive')
  }
  return a + b
}
```

In our tests, we can follow the same structure as before, except this time we
will make `expected` optional, and also add an optional `error`. For the valid
cases we will provide an expected value and for the invalid cases we will
provide an error value.

```ts
import test from 'ava'
import { sumPositivesOnly } from './math'

type TestCase = {
  name: string
  a: number
  b: number
  expected?: number
  error?: Error
}

const testCases: TestCase[] = [
  {
    name: 'returns the sum of two positive numbers',
    a: 1,
    b: 2,
    expected: 3,
  },
  {
    name: 'throws an error when `a` is less than one',
    a: 0,
    b: 2,
    error: new Error('a must be positive'),
  },
  {
    name: 'throws an error when `b` is less than one',
    a: 1,
    b: 0,
    error: new Error('b must be positive'),
  },
]

testCases.forEach((testCase) =>
  test(testCase.name, (t) => {
    try {
      const result = sumPositivesOnly(testCase.a, testCase.b)
      if (testCase.error) {
        // If we are expecting an error but did not receive one,
        // fail the test.
        t.fail('test case should throw an error')
      }
      t.is(result, testCase.expected)
    } catch (err) {
      if (!testCase.error) {
        // If we are not expecting an error but one is thrown,
        // fail the test.
        t.fail('test case should not throw an error')
      }
      t.deepEqual(err, testCase.error)
    }
  })
)
```

In our test logic we are now checking to see whether an error was expected. If
an error was thrown, but not expected, the test will fail. Likewise, if an error
wasn't thrown, but was expected, the test will also fail. We also make sure the
actual result matches the expected value, as well as ensuring that the error
thrown matches our expected error.

## Final Thoughts

Table driven testing is a powerful technique that can dramatically improve the
quality of your tests. By using a table driven approach to testing your tests
become more concise, expressive, and maintainable, avoiding unnecessary
duplication of test logic.

[0]: https://dave.cheney.net/2019/05/07/prefer-table-driven-tests
[1]: https://yourbasic.org/golang/table-driven-unit-test/
[2]: https://github.com/avajs/ava
