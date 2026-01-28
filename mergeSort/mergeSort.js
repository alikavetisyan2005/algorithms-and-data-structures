function merge(nums1, nums2) {
    let size1 = nums1.length;
    let size2 = nums2.length;
    let res = [];
    let i = 0;;
    let j = 0;
    while(i < size1 && j < size2){
        if(nums1[i] <= nums2[j]){
            res.push(nums1[i++]);
        }
        else{
            res.push(nums2[j++]);
        }
    }
    while(i < size1){
        res.push(nums1[i++]);
    }
    while(j < size2){
        res.push(nums2[j++])
    }
    return res
};

function mergeSort(nums){
    if(nums.length <= 1){
        return nums;
    }
    const mid = Math.floor(nums.length / 2);
    const left = nums.slice(0,mid);
    const right = nums.slice(mid);
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
    return merge(sortedLeft,sortedRight); 
}

let nums = [-7,5,1,12,9,11];
console.log(mergeSort(nums));