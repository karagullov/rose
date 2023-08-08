const CONVERSION_RATIOS = {
  m: 1,
  cm: 0.01,
  in: 0.0254,
  ft: 0.3048,
  mm: 0.001,
  yd: 0.9144,
  km: 1000,
};

function convertDistance(inputData) {
  const parsedData = JSON.parse(inputData);
  const { distance, convert_to } = parsedData;
  const { unit, value } = distance;

  if (!CONVERSION_RATIOS[unit] || !CONVERSION_RATIOS[convert_to]) {
    throw new Error("Unsupported units!");
  }

  const metersValue = value * CONVERSION_RATIOS[unit];
  const resultValue = metersValue / CONVERSION_RATIOS[convert_to];

  const roundedValue = Math.round(resultValue * 100) / 100;

  const resultUnit = convert_to === "ft" ? "foot" : convert_to;

  const resultData = {
    unit: resultUnit,
    value: roundedValue,
  };
  return JSON.stringify(resultData);
}

const arg = JSON.stringify({
  distance: {
    unit: "m",
    value: 1000,
  },
  convert_to: "km",
});

console.log("1-task result:", convertDistance(arg));
