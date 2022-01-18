import { Table } from "antd";
import { IUser } from "./search-panel";

interface IProject {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface IListProps {
  list: IProject[];
  users: IUser[];
}

export const List = ({ users, list }: IListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
};
