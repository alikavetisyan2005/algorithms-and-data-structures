function counting(arr){
    let n = arr.length;
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let range = max - min + 1
    let count = new Array(range).fill(0);

    for(let i = 0;i < n;i++){
        count[arr[i] - min]++;

        
    }

    for(let i = 1;i < count.length;i++){
        count[i] += count[i - 1];
    }

    let output = new Array(n);
    for(let i = n - 1;i >= 0;i--){
        let value = arr[i];
        let idx = value - min;
        let pos = count[idx] - 1;
        output[pos] = value;
        count[idx]--
    }
    return output;

    
}

let arr = [1,2,1,1,1,0];

console.log(counting(arr))