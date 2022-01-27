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

## 先跳过或者暂不理解地方

### 7-5 实现 Error Boundaries
