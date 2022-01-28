import { Form, Input, Select } from "antd";

export interface IUser {
  id: string;
  name: string;
  email: string;
  personId: string;
  organization: string;
  token: string;
}

interface ISearchPanelProps {
  users: IUser[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: ISearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: ISearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        {/* setParam(Object.assign({}, param,{name:evt.target.value})) */}
        <Input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
