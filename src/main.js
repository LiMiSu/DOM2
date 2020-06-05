// const api=jQuery(".test");//不返元素们，返回api对象
// api.addClass('red');//遍历所有刚才获取的所有的元素添加.red
// api.addClass('red1').addClass('red2');//链式操作

// jQuery(".test")
//     .addClass('red1')
//     .addClass('red2');


// const x=jQuery('.test1').find('.child').addClass('red2').end().addClass('aaa');
// console.log(x);
// x.each((a,b)=>console.log(a,b));
// x.parent().print();
// x.children().print();
// x.index().print();
// x.next().print();

$('#test').find('.child').addClass('red')
const test = document.querySelector('#test');
console.log(test);