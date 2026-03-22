
function bubbleSort(arr){
    for(let i = 0;i < arr.length - 1;i++){
        let flag = false;
        for(let j = 0;j < arr.length - 1 - i;j++){
            if(arr[j + 1] < arr[j]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
                flag = true;
            }

            
        }
        if(!flag){
                return arr
        }
    }
    return arr
}

let arr = [2,4,13,1,3];
console.log(bubbleSort(arr))