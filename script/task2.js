function includeRule(data, includeConditions) {
  return data.filter((item) => {
    return includeConditions.every((condition) => {
      const key = Object.keys(condition)[0];
      return item[key] === condition[key];
    });
  });
}

function excludeRule(data, excludeConditions) {
  return data.filter((item) => {
    return excludeConditions.every((condition) => {
      const key = Object.keys(condition)[0];
      return item[key] !== condition[key];
    });
  });
}

function sortByRule(data, sortKeys) {
  return data.sort((a, b) => {
    for (const key of sortKeys) {
      const compareResult = String(a[key]).localeCompare(String(b[key]));
      if (compareResult !== 0) {
        return compareResult;
      }
    }
    return 0;
  });
}

function applyCondition(data, condition) {
  const parsedData = JSON.parse(data);
  const parsedCondition = JSON.parse(condition);
  let result = parsedData.slice();

  if (parsedCondition.include) {
    const includeConditions = parsedCondition.include;
    result = includeRule(result, includeConditions);
  }

  if (parsedCondition.exclude) {
    const excludeConditions = parsedCondition.exclude;
    result = excludeRule(result, excludeConditions);
  }

  if (parsedCondition.sort_by) {
    const sortKeys = parsedCondition.sort_by;
    result = sortByRule(result, sortKeys);
  }

  return JSON.stringify(result);
}

const data = [
  {
    email: "mike@mail.com",
    rating: 20,
    disabled: false,
  },
  {
    email: "greg2@mail.com",
    rating: 30,
    disabled: true,
  },
  {
    email: "greg1@mail.com",
    rating: 14,
    disabled: true,
  },
  {
    email: "greg3@mail.com",
    rating: 25,
    disabled: true,
  },

  {
    email: "john@mail.com",
    rating: 25,
    disabled: false,
  },
  {
    email: "john@mail.com",
    rating: 25,
    disabled: false,
  },
];

const condition = {
  include: [
    {
      disabled: true,
    },
  ],
  sort_by: ["rating"],
};

const outputData = applyCondition(
  JSON.stringify(data),
  JSON.stringify(condition)
);

console.log("2-task result:", outputData);
