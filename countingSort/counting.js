let arr = [1,2,2,3,34,1,3,1];
function countingSort(arr){
    let n = arr.length;
    let count = []
    for(let i = 0;i < arr.length;++i){
        count[arr[i]]++;
    }
    return count;
}
console.log(countingSort(arr))