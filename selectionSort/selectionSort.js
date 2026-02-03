let arr = [5,6,1,89,10];

function selectionSort(arr){
    const n = arr.length;
    for(let i = 0;i < n -1;i++){
        let minIndex = i;
        for(let j = i + 1;j < n;j++){
            if(arr[minIndex] > arr[j]){
                minIndex = j;
            }
        }
        [arr[minIndex],arr[i]] = [arr[i], arr[minIndex]];
    }
    return arr;
}
console.log(selectionSort(arr))