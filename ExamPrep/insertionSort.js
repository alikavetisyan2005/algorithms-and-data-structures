function insertion(arr){
    let n = arr.length;

    for(let i = 1;i < n;i++){
        let j = i - 1;
        let key = arr[i];
        while(j >= 0 && arr[j] > key){
            arr[j + 1] = arr[j];
            --j;
        }

        arr[j+1] = key;
    }

    //[3,2,45,4,1]
    // i = 1, j = 0, key = [2], [2,3,45,4,1]
}