import React from "react";
import Task from "../data/Task";
import {Form, Input, Button, Modal} from "antd";
import {FormComponentProps} from "antd/lib/form";
import axios, {AxiosResponse} from 'axios';

interface CourierProps extends FormComponentProps {

}

interface CourierState {
    readonly loadTasks: Task[]
}

class CourierPage extends React.PureComponent<CourierProps, CourierState> {

    constructor(props: CourierProps, state: CourierState) {
        super(props, state);
        this.state = {
            loadTasks: []
        }
    }

    handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (err) {
                console.log("Error while validating fields: ", err);
                return;
            }

            const {orderNumber} = value;
            axios.put<{ readonly orderName: string }, AxiosResponse<any>>("/v1/task/create_new_task", {"orderNumber": orderNumber})
                .then(() => {
                    Modal.success({
                        content: `A new order with a name: ${orderNumber} successfully created.`
                    })
                })
                .catch(reason => {
                    console.error(`Error while creating a new order with a name ${orderNumber}`, reason);
                    Modal.error({
                        content: `Can't create an order with a name: ${orderNumber}.`
                    })
                })
        })
    };

    render(): any {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} title={"Add new order."}>
                <Form.Item>
                    {getFieldDecorator('orderNumber', {
                        rules: [
                            {required: true}
                        ]
                    })(
                        <Input placeholder={"Order number"}/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type={"primary"} htmlType={"submit"}>
                        I do not have time.
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create<CourierProps>()(CourierPage);
