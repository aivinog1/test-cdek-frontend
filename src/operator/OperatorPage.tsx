import React from "react";
import Task from "../data/Task";
import {Table, Modal} from "antd";
import {ColumnProps, ColumnFilterItem} from 'antd/es/table';
import axios from 'axios';
import {AxiosResponse} from 'axios';

interface OperatorProps {
}

interface OperatorState {
    readonly loadTasks: Task[]
}

class OperatorPage extends React.PureComponent<OperatorProps, OperatorState> {

    private getOrderNumberFilters(): ColumnFilterItem[] {
        if (!this.state) {
            return []
        }
        return this.state.loadTasks
            .map(value => {
                return {
                    value: value.orderNumber,
                    text: value.orderNumber
                }
            });
    }

    constructor(props: OperatorProps, state: OperatorState) {
        super(props, state);
        this.state = {
            loadTasks: []
        }
    }

    componentDidMount(): void {
        axios.get<void, AxiosResponse<Task[]>>('/v1/task/get_all')
            .then(value => {
                this.setState({
                    loadTasks: value.data
                })
            })
            .catch(reason => {
                Modal.error({
                    content: `There is an error while requesting API. Let's try later.`
                });
                console.log("Error: ", reason)
            })
    }

    render(): any {

        const columns: ColumnProps<Task>[] = [
            {
                key: "orderNumber",
                title: "Order Number",
                dataIndex: "orderNumber",
                filters: this.getOrderNumberFilters(),
                onFilter: (value, record) => {
                    return record.orderNumber.indexOf(value) === 0;
                }
            },
            {
                key: "orderDate",
                title: "Order date",
                dataIndex: "createdDate"
            }
        ];
        return (
            <Table<Task>
                dataSource={this.state.loadTasks}
                columns={columns}
                rowKey={(record) => {
                    return record.id;
                }}
                title={() => {
                    return "Courier's tasks";
                }}
            />
        );
    }
}

export default OperatorPage;