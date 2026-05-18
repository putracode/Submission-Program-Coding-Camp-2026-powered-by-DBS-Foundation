import { sum } from "./index.js";
import { test } from "node:test";
import assert from "node:assert";

test("should sum correctly", () => {
  // Arrange
  const operandA = 1;
  const operandB = 1;

  // Action
  const actualValue = sum(operandA, operandB);

  // Assert
  const expectedValue = 2;
  assert.strictEqual(actualValue, expectedValue);
});

test("should return concatenated string if parameter 'a' is a string", () => {
  // Arrange
  const operandA = "6";
  const operandB = 4;

  // Action
  const actualValue = sum(operandA, operandB);

  // Assert
  const expectedValue = "64";
  assert.strictEqual(actualValue, expectedValue);
});

test("should return concatenated string if parameter 'b' is a string", () => {
  // Arrange
  const operandA = 6;
  const operandB = "7";

  // Action
  const actualValue = sum(operandA, operandB);

  // Assert
  const expectedValue = "67";
  assert.strictEqual(actualValue, expectedValue);
});