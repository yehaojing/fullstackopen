export const calculateBmi = (height: number, weight: number): string => {
  if (!height || !weight) throw new Error("No height/weight provided");
  if (height < 0 || weight < 0) throw new Error("Negative value(s) provided");

  const bmi = weight / Math.pow(height / 100, 2);

  if (0 <= bmi && bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (16.0 <= bmi && bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (16.9 < bmi && bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (18.4 < bmi && bmi <= 24.9) {
    return "Normal range";
  } else if (24.9 < bmi && bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (29.9 < bmi && bmi <= 34.9) {
    return "Obese (Class I)";
  } else if (34.9 < bmi && bmi <= 39.9) {
    return "Obese (Class II)";
  } else if (39.9 < bmi) {
    return "Obese (Class III)";
  } else {
    throw new Error("Unable to determine BMI");
  }
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

try {
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
