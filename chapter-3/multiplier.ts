const multiply = (a, b, printText) => {
  console.log(printText, a * b);
};

// multiply(2, 4, 'Multiplied numbers 2 and 4, the result is:');
// returns 8

// multiply("how about a string?", 4, "Multiplied a string and 4, the result is:");
// returns NaN

const multiplyWithTypes = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

// VSCode or editor shows type error without needing to execute the code to show runtime error
// multiplyWithTypes('how about a string?', 4, 'Multiplied a string and 4, the result is:');

// custom types
// string literal types
type Operation = "times" | "add" | "divide";

type Result = string | number;

const calculator = (a: number, b: number, op: Operation): Result => {
  if (op === "times") {
    return a * b;
  } else if (op === "add") {
    return a + b;
  } else if (op === "divide") {
    if (b === 0) return "can't divide by 0!";
    return a / b;
  }

  return "invalid operation";
};

// even though there are defined types for the parameters, the generated JavaScript used at runtime does not contain the type checks.
//If the Operation parameter's value comes from an external interface, there is no definite guarantee that it will be one of the allowed values.
// Therefore, it's still better to include error handling and be prepared for the unexpected to happen.

const calculatorImproved = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "times":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not times, add or divide!");
  }
};

try {
  console.log("Original calculator:", calculator(1, 5, "divide"));

  console.log("Improved calculator: ", calculatorImproved(1, 5, "divide"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
