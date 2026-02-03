let arr = [5,6,1,89,10];

function insertionSort(arr){
    let n = arr.length;
    for(let i = 1;i < n;i++){
        let j = i - 1;
        let key = arr[i];
        while(j >= 0 && arr[j] > key){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
    return arr
}

console.log(insertionSort(arr));
//step 1 [5,6,1,89,10]
//step 2 [5,6,6,89,10]
//step 3 [5,5,6,89,10]
//step 4 [1,5,6,89,10] 
//step 5 i = 3 key = 89 j = 2 while chi mtnum 
//step 6 i = 4 key = 10 j = 3 [1,5,6,10,89] 
