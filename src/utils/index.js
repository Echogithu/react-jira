export const ifFalsy = (value) => (value === 0 ? false : !value); //!!value转成boolean值

// 注意不要污染传入对象
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (ifFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
