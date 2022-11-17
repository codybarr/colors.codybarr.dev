// Source: https://stackoverflow.com/a/48876834
export const binarySearch = (arr, target, lo = 0, hi = arr.length - 1) => {
  if (target < arr[lo]) {
    return arr[0]
  }
  if (target > arr[hi]) {
    return arr[hi]
  }

  const mid = Math.floor((hi + lo) / 2)

  return hi - lo < 2
    ? target - arr[lo] < arr[hi] - target
      ? arr[lo]
      : arr[hi]
    : target < arr[mid]
    ? binarySearch(arr, target, lo, mid)
    : target > arr[mid]
    ? binarySearch(arr, target, mid, hi)
    : arr[mid]
}
