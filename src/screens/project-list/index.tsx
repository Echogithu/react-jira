import { List } from "./list";
import { SearchPanel } from "./search-panel";
import React, { useState, useEffect } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

// 使用JS，大部分错误是在runtime(运行时)的时候发现的
// 我们希望在静态代码中，就能找到其中一些错误 -> 强类型
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
