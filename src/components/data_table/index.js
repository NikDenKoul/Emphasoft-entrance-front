import './index.css';
import {Cancel, Check, Visibility} from "./icons";

function DataTable({ columns, rows, entityPath, onEdit, onDelete }) {
    return (
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
                {rows.map((item) => (
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
                                <a href={`${entityPath}?id=${item.id}`} color="green">
                                    <Visibility color='green'/>
                                    {/*<Button color="secondary" variant="outlined">*/}
                                    {/*    <Visibility/>*/}
                                    {/*</Button>*/}
                                </a>
                            </td>
                        )}
                        {onEdit && (
                            <td align="center">
                                {/*<Button color="secondary" variant="contained" data-id={item.id} onClick={onEdit}>*/}
                                {/*    <Edit data-id={item.id} />*/}
                                {/*</Button>*/}
                            </td>
                        )}
                        {onDelete && (
                            <td align="center">
                                {/*<Button color="danger" variant="contained" data-id={item.id} onClick={onDelete}>*/}
                                {/*    <Delete data-id={item.id} />*/}
                                {/*</Button>*/}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataTable;
