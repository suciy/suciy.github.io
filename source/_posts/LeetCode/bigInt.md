// 实现两个超大数相加（超大数指超过语言支持的数字的最大表示范围）

```
add(99,15)
function add(a, b){
  var res = '',
  temp = 0
  nums1 = (a + '').split(''),
  nums2 = (b + '').split('');
  while(a.length || b.length || temp){
    temp += ~~nums1.pop() + ~~nums2.pop();
    res = (temp % 10) + '';
    temp = temp > 9;
  }
  return res;
}
```