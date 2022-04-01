import React from "react";
import "./index.css"
import { Table, Row, Col, Tooltip, User, Text, Divider, Modal } from '@nextui-org/react'
import { EyeIcon } from "./EyeIcon";
import { DeleteIcon } from './DeleteIcon';
import { EditIcon } from "./EditIcon";
import { IconButton } from "./IconButton";
import { Api, config } from '../../api';

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.api = new Api(config)
        this.columns = [
            { key: "date", label: "日期" },
            { key: "money", label: "金额" },
            { key: "cls", label: "类别" },
            { key: "label", label: "标签" },
            { key: "actions", label: "ACTIONS" }
        ];
        this.state = {
            year: this.props.year,
            month: this.props.month,
            rows: [],
        }
    }
    async componentDidMount() {
        const date = new Date();
        const data = await this.api.getData(
            this.state.year ? this.state.year : date.getFullYear(),
            this.state.month ? this.state.month : date.getMonth() + 1
        );
        this.setState({
            rows: data
        });
    }

    deleteItem = async (itemId) => {
        /**
         * 
         * 1. 弹出框确认删除
         * 2. 调用api删除
         * 3. 从rows中移除该item
         * 4. 提示已删除
         */
        // TODO: 1
        //2 
        await this.api.removeItemById(itemId);
        // TODO: 2
        // TODO: 3
        // TODO: 4
    }

    renderCell = (item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case "date":
                return (
                    <div>{new Date(cellValue).toLocaleDateString()}</div>
                );
            case "money":
                return (
                    <div>{cellValue}</div>
                );
            case "cls":
                return (
                    <div>{cellValue}</div>
                );
            case "label":
                return (
                    <div>{cellValue}</div>
                );
            case "actions":
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Tooltip content={item["options"]}>
                                <IconButton onClick={() => console.log("View user", item.id)}>
                                    <EyeIcon size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Edit item">
                                <IconButton onClick={() => console.log("Edit item", item.id)}>
                                    <EditIcon size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Delete item"
                                color="error"
                                onClick={() => console.log("Delete item", item.id)}
                            >
                                <IconButton>
                                    <DeleteIcon size={20} fill="#FF0080" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                );
            default:
                return cellValue;
        }
    }

    render() {
        return (
            <Table className="table"
                aria-label="Example table with dynamic content"
                css={{
                    height: "auto",
                    // minWidth: "100%",
                    textAlign: "left"
                }}
                selectionMode="multiple"
            >
                <Table.Header columns={this.columns}>
                    {(column) => (
                        <Table.Column
                            key={column.key}
                            hideHeader={column.key == "actions"}
                            align={column.uid === "actions" ? "center" : "start"}
                        // width={column.key == "actions" ? "20%" : undefined}
                        >
                            {column.label}
                        </Table.Column>
                    )}
                </Table.Header>
                <Table.Body items={this.state.rows}>
                    {(item) => (
                        <Table.Row key={item.id}>
                            {(columnKey) => <Table.Cell>{this.renderCell(item, columnKey)}</Table.Cell>}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        );
    }
}

