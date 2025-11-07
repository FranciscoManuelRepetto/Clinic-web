import {
  ChevronUp,
  ChevronDown,
} from "lucide-react"

interface contentConfig {
    columnName: string, // Nombre que se renderiza en la columna
    key: string, // clave del arreglo data que coloca el dato
    isId: boolean, // si el valor del campo es unico
    formatFunction?(elem: any): string, // funcion para formatear el dato, por ejemplo para formatear fechas
    sorts: boolean // si este campo se usa para ordenar
    draw: boolean // si se dibuja este campo en la tabla
}

interface sortConfig {
    currentSort: string;
    currentOrder: string;
    sortHandler(sort: string, order: string): void;
}

interface StripedTableProps {
    contentConfig: contentConfig[];
    data: any[];
    className?: string;
    color?: string;
    sortConfig?: sortConfig;
    rowAction?(row: any): void;
}




export default function StripedTable({contentConfig, data, className, color, sortConfig, rowAction}: StripedTableProps){
    if (contentConfig.some((elem) => elem.sorts) && !sortConfig) {
        console.error("La tabla se configuro con columnas que se ordenan pero no se definio sortConfig!")
    }
    const idCell = contentConfig.find((cell) => cell.isId);
    const idKey = idCell ? idCell.key : "";
    return(
        <table className={`${className} table-auto bg-white`}>
            <thead>
                <tr>
                    {contentConfig.map((column, index) => {
                    if(column.draw)
                        return (
                        <th key={index} className="px-4 py-2">
                            {column.sorts && sortConfig 
                                ? (<div className="flex flex-row place-items-center justify-center"> {column.columnName} {
                                    sortConfig.currentSort === column.key
                                        ? sortConfig.currentOrder === "asc"
                                            ? <ChevronDown className="cursor-pointer text-accent" onClick={() => sortConfig.sortHandler(column.key, "desc")}/>
                                            : <ChevronUp className="cursor-pointer text-accent" onClick={() => sortConfig.sortHandler(column.key, "asc")}/>
                                        : <ChevronDown className="cursor-pointer text-gris-oscuro" onClick={() => sortConfig.sortHandler(column.key, "asc")}/>
                                    }
                                </div>)
                                : column.columnName}
                        </th>)}
                    )}
                </tr>
            </thead>
            <tbody className="text-center">
                {
                    data.map((elem, index) => {
                        return(
                            <tr 
                                className={index % 2 == 0 ? color ? `bg-${color}` : 'bg-primary' : ''}
                                key={idKey ? elem[idKey] : index}
                                onClick={() => rowAction ? rowAction(elem) : {}}
                            >
                                {
                                    contentConfig.map((cell) => {
                                        if(cell.draw)
                                            return (
                                            <td key={cell.key} className="px-4 py-2">
                                                {cell.formatFunction ? cell.formatFunction(elem[cell.key]) : elem[cell.key]}
                                            </td>
                                        ) 
                                    })
                                }
                            </tr>
                            )
                        })
                }
            </tbody>
        </table>
    )
}