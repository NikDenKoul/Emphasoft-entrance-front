import './index.css';
import {Cancel, Check, Delete, Pencil, Visibility} from "../icons";
import {useEffect, useState} from "react";
import TextField from "../text_field";
import Button from "../button";
import {useNavigate} from "react-router-dom";

function DataTable({ columns, rows, entityPath, onEdit, onDelete }) {
    const [dataRows, setDataRows] = useState(rows ?? []);
    const [filterField, setFilterField] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const navigate = useNavigate();

    const handleFilter = (field, value) => {
        setFilterField(field);
        setFilterValue(value)
        const type = columns.find((col) => col.field === field)?.type ?? 'text';

        if (type === 'text') {
            setDataRows(rows.filter((row) => row[field].includes(value)));
        }
    }

    useEffect(() => {
        setDataRows(rows);
    }, [rows])

    return (
        <>
            <div className='filters'>
                {columns.filter((column) => column.filterable).map((column) => (
                    <TextField label={`Filter by ${column.label}:`} type={column.type ?? 'text'}
                               value={filterField === column.field ? filterValue : ''} vertical
                               onChange={(e) => handleFilter(column.field, e.target.value)}
                    />
                ))}
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <th align={column.align ?? 'center'}>{column.label}</th>
                        ))}
                        {entityPath && (
                            <th align='center'>Observe</th>
                        )}
                        {onEdit && (
                            <th align='center'>Edit</th>
                        )}
                        {onDelete && (
                            <th align='center'>Delete</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {dataRows.map((item) => (
                        <tr>
                            {columns.map((column) => (column.type === 'boolean' ? (
                                    <td align={column.align ?? 'center'}>
                                        {item[column.field] ? (
                                            <Check color="green" />
                                        ) : (
                                            <Cancel color="red" />
                                        )}
                                    </td>
                                ) : (
                                    <td align={column.align ?? 'center'}>
                                        {item[column.field] ?? (<i>None</i>)}
                                    </td>
                                )
                            ))}
                            {entityPath && (
                                <td align="center">
                                    <Button color='green' outlined onClick={() => navigate(`/${entityPath}/${item.id}`)}>
                                        <Visibility color='green'/>
                                    </Button>
                                </td>
                            )}
                            {onEdit && (
                                <td align="center">
                                    <Button color='green' outlined onClick={() => onEdit(item.id)}>
                                        <Pencil color='green'/>
                                    </Button>
                                </td>
                            )}
                            {onDelete && (
                                <td align="center">
                                    <Button color='red' outlined onClick={() => onDelete(item.id)}>
                                        <Delete color='red'/>
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataTable;
