interface Inputs {
  option: number;
  numbers: number[];
}

export const argumentSanitation = (args: string[]): Inputs => {
  // requires 3 arguments
  if (args.length < 4) throw new Error("Not enough arguments");

  const userArguments = args.slice(2);
  const allNumbers = userArguments.every((e) => !isNaN(Number(e)));

  if (allNumbers) {
    return {
      option: Number(userArguments[0]),
      numbers: userArguments.slice(1).map((e) => Number(e)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
