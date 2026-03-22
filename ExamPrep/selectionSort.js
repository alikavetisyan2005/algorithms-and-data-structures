function selectionSort(arr){
    let n = arr.length;
    for(let i = 0;i < n;i++){
        let minIndex = i;
        for(let j = i + 1;j < n - 1;j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]];
    }

    return arr
}

let arr = [3,4,1,3,6,11]

console.log(selectionSort(arr))

