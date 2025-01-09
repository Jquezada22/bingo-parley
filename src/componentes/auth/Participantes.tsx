import React, { useState } from "react";
import * as XLSX from "xlsx";

const Participantes: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });

        let combinedData: any[] = [];

        // Iteramos sobre todas las hojas del archivo
        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

          console.log(`Datos crudos de la hoja "${sheetName}":`, jsonData);

          // Filtramos y combinamos los datos relevantes
          const filteredData = jsonData
            .filter((row) => row.DNI && row.NOMBRE && row.CELULAR) // Solo registros completos
            .map((row) => ({
              DNI: row.DNI,
              NOMBRE: row.NOMBRE,
              CELULAR: row.CELULAR,
              SALA: sheetName, // Agregamos la columna "SALA" con el nombre de la hoja
            }));

          combinedData = [...combinedData, ...filteredData];
        });

        if (removeDuplicates) {
          // Eliminamos duplicados según DNI y NOMBRE
          const uniqueData = combinedData.reduce((acc, current) => {
            if (!acc.find((item: any) => item.DNI === current.DNI && item.NOMBRE === current.NOMBRE)) {
              acc.push(current);
            }
            return acc;
          }, []);
          combinedData = uniqueData;
        }

        console.log("Datos combinados de todas las hojas:", combinedData);

        // Guardamos los datos combinados
        setData(combinedData);
        setFileUploaded(true);
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="p-4">
      {!fileUploaded && (
        <div>
          <label htmlFor="fileInput" className="block mb-2 font-bold">
            Subir archivo Excel
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="block border rounded p-2"
          />
          <div className="mt-4">
            <label htmlFor="removeDuplicates" className="inline-flex items-center">
              <input
                type="checkbox"
                id="removeDuplicates"
                checked={removeDuplicates}
                onChange={(e) => setRemoveDuplicates(e.target.checked)}
                className="mr-2"
              />
              Eliminar datos repetidos (por DNI y Nombre)
            </label>
          </div>
        </div>
      )}

      {fileUploaded && (
        <div className="mt-32">
          <h2 className="text-6xl font-bold mb-4 text-center text-white">Lista de Participantes</h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 mx-auto w-2/3 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-300">
                  <th className="border border-gray-300 px-4 py-2">N°</th>
                  <th className="border border-gray-300 px-4 py-2">DNI</th>
                  <th className="border border-gray-300 px-4 py-2">NOMBRE</th>
                  <th className="border border-gray-300 px-4 py-2">CELULAR</th>
                  <th className="border border-gray-300 px-4 py-2">SALA</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {data.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-center">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">{row.DNI}</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">{row.NOMBRE}</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">{row.CELULAR}</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">{row.SALA}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Participantes;
