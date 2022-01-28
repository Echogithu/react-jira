## grid 和 flex 各自应用场景

1. 要考虑是一维布局还是二维布局
   一般来说， 一维布局用 flex，二维布局用 grid
2. 是从内容出发还是布局出发？
   从内容出发：先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，有内容自己的大小决定占据的空间
   从布局出发：先规划网格（数量一般比较固定），然后再把元素往里面填充
   从内容出发，用 flex
   从布局出发，用 grid

## TS object

```
let a: object
a = {name:'jack}
a=() => {}
a = new RegExp('')

let b: { [key: string]: unknown };
b = { name: "Jack" };
b = () => {};
```

## 修改网页标题

### 方案一： react-helmet

### 方案二： 使用 useDocumentTitle

## react hook 与闭包，容易踩坑地方

第 8-2 节

## react-router 和 react-router-dom 的关系

react-router 和 react-router-dom 的关系类似于 react 和 react-dom/react-native 的关系

## useMemo 和 useEffect 容易踩坑地方

基本类型可以放到依赖里
组件状态可以放到依赖里
非组件状态的对象不可以放到依赖里

```
const [obj, setObj] = useState({}) // 组件状态
useEffect(
   () => console.log(obj),
   [obj]
)

const obj1 = {} // 组件状态
useMemo(
   () => console.log(obj),
   [obj1] // 错误，会死循环，因为每次都是不同对象
)
```

例子：
8-6 节

## iterator

https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js

```
import "./styles.css";

const obj = {
  data: ["hello", "world"],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++] + "!",
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (let o of obj) {
  console.log(o);
}
```

## 先跳过或者暂不理解地方

### 7-5 实现 Error Boundaries
