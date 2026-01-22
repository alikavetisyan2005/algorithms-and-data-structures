let arr = [5,1,3,9,22,6,8];

function bubleSort(arr){
    for(let i = 0;i < arr.length - 1;++i){
        for(let j = 0; j < arr.length - 1 - i;++j){
            if(arr[j] > arr[j + 1]){
            [arr[j],arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr;
}
console.log(bubleSort(arr));

