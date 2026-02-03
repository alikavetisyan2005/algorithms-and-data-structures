let arr = [48,32,34,34,67,32,39];
function countingSortLevel2(arr){
    if(arr.length <= 1){
        return arr;
    }
    let n = arr.length;
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let range = max - min + 1;
    const count = new Array(range).fill(0);
    for(let i = 0; i < n; i++){
        count[arr[i] - min]++;
    }
    const sorted = []
    for(let i = 0;i < range;i++){
        while(count[i]-- > 0){
            sorted.push(i + min);
        }
    }
    return sorted
}
console.log(countingSortLevel2(arr))