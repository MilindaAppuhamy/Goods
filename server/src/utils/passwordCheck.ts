const passwordComplexity = require("joi-password-complexity");

export function passwordCheck(password: string): string {
  const complexityOptions = {
    min: 5,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 3,
  };

  const result = passwordComplexity(complexityOptions).validate(password);

  if (result.error) {
    return result.error.details[0].message.substring(7);
  } else {
    return "passed";
  }
}
