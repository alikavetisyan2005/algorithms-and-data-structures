let arr = [4,2,2,8,0,3,3,1];
function countingSort(arr){
    if(arr.length <= 1){
        return arr;
    }
    let n = arr.length;
    let max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);
    for(let i = 0;i < n;i++){
        count[arr[i]]++;
    }
    let sorted = [];
    for(let i = 0;i < count.length;i++){
        while(count[i]-- > 0){
            sorted.push(i);
        }
    }
    return sorted;
}

console.log(countingSort(arr))