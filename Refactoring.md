# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in
[`dpk.js`](dpk.js) to make it easier to read and understand without changing its
functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your
   refactor doesn't break it. We typically use `jest`, but if you have another
   library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are
   many valid ways to define those words - use your own personal definitions,
   but be prepared to defend them. Note that we do like to use the latest JS
   language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you
   did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the
depth of your refactor, and the level of insight into your thought process
provided by the written explanation.

## Your Explanation Here

At the beginning I applied a simple refactoring removing conditionals and
abstracting the create hash logic in a function.

Then, I realized it could be a
good opportunity to implement some functional programming concepts. We are
splitting the function on smaller pure functions units that can be tested
independently and composed together to perform the _deterministicPartitionKey_
work.

Utterly you can see at the _deterministicPartitionKey_ _pipe_ and read the functions
it is composed of.

This improves readability and it is simpler to understand
since each function has a single responsability and the result it is just a
composition of each result, further more each function can be unit tested and
reusable. Part of this logic can be extracted in an utils file.
