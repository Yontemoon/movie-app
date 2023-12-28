import "../styles/table.css"
import {
   useReactTable,
   getCoreRowModel,
   flexRender
} from '@tanstack/react-table';
import { useContext,  } from 'react';
import { MovieContext } from "../providers/MovieProvider";
import { MovieContextType } from "../providers/MovieProvider";
// import { div } from "@chakra-ui/react";
import { MovieType } from '../models/Movietype.types';

type ColumnTypes = {
    getValue: () => number | string; 
}

const columns = [
    {
        accessorKey: "id",
        header: "ID",
        cell: (props:ColumnTypes) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: (props:ColumnTypes) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "release_date",
        header: "Release Date",
        cell: (props:ColumnTypes) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "vote_count",
        header: "Vote Count",
        cell: (props:ColumnTypes) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "vote_average",
        header: "Average Score",
        cell: (props:ColumnTypes) => <p>{props.getValue()}</p>
    }
]


const Table = () => {
    const {movies}  = useContext(MovieContext) as MovieContextType

    const table = useReactTable({
        data: movies as MovieType[],
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: "onChange"
    })

    return (
        <div>
            <div className="table" width={table.getTotalSize()} w={table.getTotalSize()}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <div key={headerGroup.id} className="tr">
                        {headerGroup.headers.map((header) => (
                            <div key={header.id} className="th" w={header.getSize()}>
                                {header.column.columnDef.header}
                                <div 
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                    className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                                />
                            </div>
                        ))}
                    </div>
                ))}
                {table.getRowModel().rows.map((row) => (
                    <div className="tr" key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <div className="td" key={cell.id} w={cell.column.getSize()}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Table;