let arr = [10,12,3,1,23,13]

function partition(arr, low,high){
    let pivot = arr[low];
    let i = low + 1;
    let j = high
    while(i <= j){
        while(arr[i] <= pivot){
            i++;
        }
        while(arr[j] > pivot){
            j--;
        }
        if(i <= j){
            [arr[i],arr[j]] = [arr[j],arr[i]]
        }
    }
    [arr[low],arr[j]] = [arr[j],arr[low]]
    return j
}


function quickSort(arr,low = 0,high = arr.length - 1){
    if(low <= high){
        const partitionIndex = partition(arr, low, high);
        quickSort(arr, low, partitionIndex - 1);
        quickSort(arr,partitionIndex + 1, high);
    }
    return arr
}

console.log(quickSort(arr))

//time complexity best case: O log n
//worst case: o n^2, accurs when pivot is picked max or min element in array