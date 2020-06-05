// window.jQuery=function (selector) {
// // console.log('我是jQuery')
//     const elements=document.querySelectorAll(selector);
//     const api={
//         //api可以操作elements
//         // "addClass":function(className){};//最新的ES6语法可以省略function和冒号
//         addClass(className){
//             for (let i=0;i<elements.length;i++){//闭包：函数访问外部变量
//                 elements[i].classList.add(className);
//             }
//             // return api;//返回调用者可以链式调用 就是this 函数都能返回
//             return this;
//         }
//     }
//     return api;//返回的不是元素，而是可以操作的对象
// }


//可以：
// window.jQuery = function (selector) {
//     const elements = document.querySelectorAll(selector);
//     return {
//         addClass(className) {
//             for (let i = 0; i < elements.length; i++) {
//                 elements[i].classList.add(className);
//             }
//             return this;//这时候就没有api这个名字了，所以return this
//         }
//     }
// }
//总结！！！！：
//1、jQuery整体返回一个对象；   2、对象里面有各种api；   3、要调用api都要通过对象.api操作；
// 4、所以api里面的this在调用时都是返回的对象；   5、所以每个api里return this就是返回对象就可以一直链式调用！！！！


//开始
// window.jQuery = function (selector) {
//     const elements = document.querySelectorAll(selector);
//     return {
//         addClass(className) {
//             for (let i = 0; i < elements.length; i++) {
//                 elements[i].classList.add(className);
//             }
//             return this;
//         },
//         find(selector){
//             let array=[];
//             for (let i=0;i<elements.length;i++){
//                 // console.log(elements[i].querySelectorAll(selector));
//                 array = array.concat(Array.from(elements[i].querySelectorAll(selector)));
//             }
//             return array;//这样就不能链式调用了
//         }
//     }
// }

// window.jQuery = function (selectorOArray) {
//     let elements;
//     if (typeof selectorOArray==="string"){
//         elements = document.querySelectorAll(selectorOArray);
//     }else if (selectorOArray instanceof Array){
//         elements=selectorOArray;
//     }
//     return {
//         addClass(className) {
//             for (let i = 0; i < elements.length; i++) {
//                 elements[i].classList.add(className);
//             }
//             return this;
//         },
//         find(selector){
//             let array=[];
//             for (let i=0;i<elements.length;i++){
//                 // console.log(elements[i].querySelectorAll(selector));
//                 array = array.concat(Array.from(elements[i].querySelectorAll(selector)));
//             }
//             // const newApi = jQuery(array);//return一个新的api对象
//             // return newApi;//想办法链式调用，用不同的elements，互不污染，而且在内部又生成的jQuery对象能继承外部jQuery对象。闭包又来了吧
//             return jQuery(array);//总结就是：jQuery就是给他传什么它就会返回一个对象去操作什么，传啥操啥
//         },
//     }
// }


// window.jQuery = function (selectorOArray) {
//     let elements;
//     if (typeof selectorOArray === "string") {
//         elements = document.querySelectorAll(selectorOArray);
//     } else if (selectorOArray instanceof Array) {
//         elements = selectorOArray;
//     }
//     return {//api对象
//         addClass(className) {
//             for (let i = 0; i < elements.length; i++) {
//                 elements[i].classList.add(className);
//             }
//             return this;
//         },
//         find(selector) {
//             let array = [];
//             for (let i = 0; i < elements.length; i++) {
//                 array = array.concat(Array.from(elements[i].querySelectorAll(selector)));
//             }
//             //为了回退操作的时候找到原来的jQuery对象
//             array.oldApi = this;//this就是旧的api对象
//             return jQuery(array);//返回的新的api对象
//         },
//         oldApi: selectorOArray.oldApi,//要把数组里的oldApi挂到对象上来，链式调用是对象调用不是数组调用，不然访问不到
//         end() {//回退操作
//             return this.oldApi;//这里找得到是因为先有的return jQuery(array)才会有调用回退操作，是return jQuery(array)调用的end
//         }
//     }
// }


window.$ = window.jQuery = function (selectorOArray) {
    let elements;
    if (typeof selectorOArray === "string") {
        elements = document.querySelectorAll(selectorOArray);
    } else if (selectorOArray instanceof Array) {
        elements = selectorOArray;
    }
    const api = Object.create(jQuery.prototype);//相当于：const api={__proto__:jQuery.prototype};
    // api.elements = elements;
    // api.oldApi = selectorOArray.oldApi;
    //可以简写：浅复制
    Object.assign(api,{
        elements : elements,
        oldApi : selectorOArray.oldApi
    })
    return api;
}


jQuery.prototype = {
    constructor: jQuery,
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className);
        }
        return this;
    },
    find(selector) {
        let array = [];
        for (let i = 0; i < this.elements.length; i++) {
            array = array.concat(Array.from(this.elements[i].querySelectorAll(selector)));
        }
        array.oldApi = this;
        return jQuery(array);
    },
    end() {
        return this.oldApi;
    },
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this;
    },
    parent() {
        const array = [];
        this.each((node) => {
            if (array.indexOf(node.parentNode) === -1) {//判断一下是不是已经找到了，有时候会找好多次
                array.push(node.parentNode);
            }
        })
        return jQuery(array);
    },
    //打印出
    print() {
        console.log(this.elements);
    },
    children() {
        const array = [];
        this.each((node) => {
            array.push(...node.children);//把数组里面的数组拆开
        })
        return jQuery(array);
    },

    prev() {
        const array = [];
        this.each((node) => {
            let last = node.previousSibling;
            if (last && last.nodeType === 3) {
                last = last.previousSibling;
            }
            array.push(last);
        })
        return jQuery(array);
    },
    next() {
        const array = [];
        this.each((node) => {
            let next = node.nextSibling;
            if (next && next.nodeType === 3) {
                next = next.nextSibling;
            }
            array.push(next);
        })
        return jQuery(array);
    },
    index() {
        const array = [];
        this.each((node) => {
            const list = Array.from(node.parentNode.childNodes).filter(n => n.nodeType === 1);
            let i;
            for (i = 0; i < list.length; i++) {
                if (list[i] === node) {
                    break
                }
            }
            array.push(i);
        })
        return jQuery(array);
    },
    siblings() {
        const array = [];
        this.each((node) => {
            if (array.indexOf(...Array.from(node.parentNode.childNodes).filter(n => n !== node)) === -1)
                array.push(...Array.from(node.parentNode.childNodes).filter(n => n !== node));
        })
        return jQuery(array);
    }
}