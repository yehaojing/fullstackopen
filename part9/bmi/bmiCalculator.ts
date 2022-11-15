const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/Math.pow(height/100, 2)
    if (0 <= bmi && bmi < 16.0) {
        return "Underweight (Severe thinness)"
    } else if (16.0 <= bmi && bmi <= 16.9) {
        return "Underweight (Moderate thinness)"
    } else if (16.9 < bmi && bmi <= 18.4) {
        return "Underweight (Mild thinness)"
    } else if (18.4 < bmi && bmi <= 24.9) {
        return "Normal range"
    } else if (24.9 < bmi && bmi <= 29.9) {
        return "Overweight (Pre-obese)"
    } else if (29.9 < bmi && bmi <= 34.9) {
        return "Obese (Class I)"
    } else if (34.9 < bmi && bmi <= 39.9) {
        return "Obese (Class II)"
    } else if (39.9 < bmi) {
        return "Obese (Class III)"
    }
}

console.log(calculateBmi(180, 74))