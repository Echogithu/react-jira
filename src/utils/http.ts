import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface IConfig extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: IConfig = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 表现不一样， axios可以直接在返回的状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // 未登录或者token失效
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

// JS 中的typeof 是在runtime时运行的
// return typeof 1 === 'number'

// TS 中的typeof 是在静态环境运行的
// return (...[endpoint, config]: Parameters<typeof http>) =>

export const useHttp = () => {
  const { user } = useAuth();

  // utility type的用法： 用泛型给它传入一个其他类型， 然后utility type 对这个类型进行某种操作
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// 类型别名在很多情况下可以和interface互换
// interface Person {
//   name: string;
// }
// type Person = {
//   name: string;
// };
// const xiaoming: Person = { name: "xiaoming" };

// 类型别名， interface在这种情况(联合类型或者交叉类型)下没法替代 type
// type FavoriteNumber = string | number;
// let roseFavoriteNumber: FavoriteNumber = '7'

// interface 也没法实现Utility type
// type Person = {
//   name: string;
//   age: number;
// };
// Partial是让属性都变为可选
// const xiaoming: Partial<Person> = { name: "小明" };
// Omit是删除某些属性，必须传入其余属性
// const shenmiren: Omit<Person, "name"> = { age: 8 };
// const shenmiren: Omit<Person, "name" | "age"> = { age: 8 };

// type PersonKeys = keyof Person // 从Person中取出key
// Partial的实现
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

// type PersonOnlyName = Pick<Person, 'name'>
// type Age = Exclude<PersonKeys, 'name'>
// Omit的实现
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };
// type Exclude<T, U> = T extends U ? never : T;
