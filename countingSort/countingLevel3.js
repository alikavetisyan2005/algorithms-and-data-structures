function countingSort(arr){
    if(arr.length <= 1) return arr;
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    const count = new Array(range).fill(0);
    for(let i = 0;i < arr.length;i++){
        count[arr[i] - min]++;
    }

    for(let i = 1;i < arr.length;i++){
        count[i] += count[i - 1]
    }
    let output = new Array(arr.length)
    for(let i = arr.length - 1;i >= 0;i--){
        let value = arr[i];
        let idx = value - min;
        let pos = count[idx] - 1
        output[pos] = value;
        count[idx]--;
    }
    return output
}

let arr = [4,2,2,8,3,6,3,5]
console.log(countingSort(arr))