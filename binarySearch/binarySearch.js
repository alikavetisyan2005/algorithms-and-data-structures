let arr = [1,3,3,7,11,34];
function binarySearch(arr,target){
    let n = arr.length;
    let start = 0;
    let end = n - 1;
    while (start <= end){
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] < target){
            start = mid + 1;
        }
        else if(arr[mid] > target){
            end = mid - 1;
        }
        else {
            return mid;
        }  
    }
    return -1
}

console.log(binarySearch(arr, 34))