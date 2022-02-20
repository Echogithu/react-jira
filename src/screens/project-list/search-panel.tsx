import { Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import { IProject } from "./list";

export interface IUser {
  id: number;
  name: string;
  email: string;
  personId: number;
  organization: string;
  token: string;
}

interface ISearchPanelProps {
  users: IUser[];
  param: Partial<Pick<IProject, "name" | "personId">>;
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
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
