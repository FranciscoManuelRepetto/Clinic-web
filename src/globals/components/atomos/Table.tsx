export default function StrippedTable({color, columnNames, data, keys, className, idKey, dateKeys, sortKeys}: {columnNames: string[], keys: string[], className?: string, idKey?:string, color?:string, dateKeys?:string[], sortKeys?: string[]}){
    //data = el arreglo de datos para llenar la tabla
    //keys = las claves para acceder al valor del dato, en el mismo orden semantico que columnNames
    // Ej: columnNames = ["Nombre", "Apellido"] keys = ["name", "surname"]
    return(
        <table className={`${className} table-auto bg-white`}>
            <thead>
                <tr>
                    {columnNames.map((column, index) => (
                        <th key={index} className="px-4 py-2">
                            {sortKeys ? sortKeys.includes(keys[index]) ? `${column} S` : column : column}
                        </th>)
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
                            >
                                {
                                    keys.map((key, index) => {
                                        return (
                                            <td key={index} className="px-4 py-2">
                                                {dateKeys ? dateKeys.includes(key) ? new Date(elem[key]).toLocaleDateString('en-GB'): elem[key] : elem[key]}
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