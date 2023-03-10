export const asyncForEach = async (arr, callback) => {
  for (let index = 0; index < arr.length; index += 1) {
    await callback(arr[index], index, arr);
  }
};