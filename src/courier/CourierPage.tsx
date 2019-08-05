import React from "react";
import Task from "../data/Task";
import {Table} from "antd";
import { ColumnProps } from 'antd/es/table';

interface CourierProps {

}

interface CourierState {
    readonly loadTasks: Task[]
}

const columns: ColumnProps<Task>[] = [
    {
        key: "orderNumber",
        title: "Order Number",
        dataIndex: "orderNumber"
    }
];

class CourierPage extends React.PureComponent<CourierProps, CourierState> {

    constructor(props: CourierProps, state: CourierState) {
        super(props, state);
        this.state = {
            loadTasks: []
        }
    }

    componentDidMount(): void {
        // this.setState({
        //     loadTasks: [
        //         {
        //             orderNumber: "123",
        //             createdDate: "123"
        //         }
        //     ]
        // })
    }

    render(): any {
        return (
            <Table<Task> dataSource={this.state.loadTasks} columns={columns}>
            </Table>
        );
    }
}

export default CourierPage;