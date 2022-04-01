import React from "react";
import "./index.css"
import { Table, Row, Col, Tooltip, User, Text, Divider } from '@nextui-org/react'
import { EyeIcon } from "./EyeIcon";
import { DeleteIcon } from './DeleteIcon';
import { EditIcon } from "./EditIcon";
import { IconButton } from "./IconButton";

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.data = props.data;
        this.columns = [
            { key: "date", label: "日期" },
            { key: "money", label: "金额" },
            { key: "cls", label: "类别" },
            { key: "label", label: "标签" },
            { key: "actions", label: "ACTIONS" }
        ];
        this.rows = [
            {
                id: 1,
                date: new Date(),
                money: 23,
                cls: "餐饮",
                label: "晚餐",
                options: "None",
            },
            {
                id: 2,
                date: new Date(),
                money: 23,
                cls: "餐饮",
                label: "晚餐",
                options: "None",
            },
            {
                id: 3,
                date: new Date(),
                money: 23,
                cls: "餐饮",
                label: "晚餐",
                options: "None",
            },
            {
                id: 4,
                date: new Date(),
                money: 23,
                cls: "餐饮",
                label: "晚餐",
                options: "None",
            },
        ];
    }
    componentDidMount() {

    }

    renderCell = (user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "date":
                return (
                    <div>{cellValue.toLocaleDateString()}</div>
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
                            <Tooltip content="Details">
                                <IconButton onClick={() => console.log("View user", user.id)}>
                                    <EyeIcon size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Edit user">
                                <IconButton onClick={() => console.log("Edit user", user.id)}>
                                    <EditIcon size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Delete user"
                                color="error"
                                onClick={() => console.log("Delete user", user.id)}
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
                <Table.Body items={this.rows}>
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

