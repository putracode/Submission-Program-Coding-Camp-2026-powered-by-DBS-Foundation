import sum from "./index.js";
import { test } from "node:test";
import assert from "node:assert";

test("should sum correctly if both inputs are positive numbers", () => {
  // Arrange
  const operandA = 1;
  const operandB = 1;
  const expectedValue = 2;

  // Action
  const actualValue = sum(operandA, operandB);

  // Assert
  assert.strictEqual(actualValue, expectedValue);
});

test("should return 0 if parameter 'a' is not a number type", () => {
  // Arrange
  const operandA = "6";
  const operandB = 7;
  const expectedValue = 0;

  // Action
  const actualValue = sum(operandA, operandB);

  // Assert
  assert.strictEqual(actualValue, expectedValue);
});

test("should return 0 if parameter 'b' is not a number type", () => {
  // Arrange
  const operandA = 6;
  const operandB = true;
  const expectedValue = 0;

  // Action
  const actualValue = sum(operandA, operandB);

  // Assert
  assert.strictEqual(actualValue, expectedValue);
});

test("should return 0 if parameter 'a' is a negative number", () => {
  // Arrange
  const operandA = -5;
  const operandB = 10;
  const expectedValue = 0;

  // Action
  const actualValue = sum(operandA, operandB);

  // Assert
  assert.strictEqual(actualValue, expectedValue);
});

test("should return 0 if parameter 'b' is a negative number", () => {
  // Arrange
  const operandA = 5;
  const operandB = -10;
  const expectedValue = 0;

  // Action
  const actualValue = sum(operandA, operandB);

  // Assert
  assert.strictEqual(actualValue, expectedValue);
});