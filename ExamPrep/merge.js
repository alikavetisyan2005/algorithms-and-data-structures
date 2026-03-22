function mergeSort(arr){
    if(arr.length <= 1) return arr;
    
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    let sortedLeft = mergeSort(left);
    let sortedRight = mergeSort(right);
    return merge(sortedLeft,sortedRight)
}

function merge(arr1,arr2){
    let i = 0;
    let j = 0;
    let size1 = arr1.length;
    let size2 = arr2.length;
    let res = [];
    while(i < size1 && j < size2){
        if(arr1[i] <= arr2[j]){
            res.push(arr1[i]);
            i++;
        }
        else{
            res.push(arr2[j]);
            j++;
        }
    }

    while(i < size1){
        res.push(arr1[i++])
    }

    while(j < size2){
        res.push(arr2[j++])
    }

    return res
}

let arr = [7,2,9,2,1,4]
console.log(mergeSort(arr))