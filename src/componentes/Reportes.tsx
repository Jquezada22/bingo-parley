import React, { useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Modal from "./Modal";

const Reportes: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="py-10">
                <h1 className="text-center md:text-5xl lg:text-6xl font-bold my-5 uppercase">REPORTE DE VENTAS BINGO PARLEY</h1>
            </div>
            <div className="mt-8 mx-auto w-full max-w-screen-lg">
                <div className="bg-white py-4 px-4 shadow-md rounded-lg">
                    <Table
                        striped
                        bordered
                        hover
                        className="table-fixed w-full"
                        style={{ tableLayout: 'fixed' }}
                    >
                        <thead>
                            <tr>
                                <th className="p-4">N°</th>
                                <th className="p-4">Fecha</th>
                                <th className="p-4">Total Venta</th>
                                <th className="p-4">Total Pozo</th>
                                <th className="p-4">Total Casa</th>
                                <th className="p-4">Total Apagón</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-4 text-center">1</td>
                                <td className="p-4 text-center">22/08/2024</td>
                                <td className="p-4 text-center">100</td>
                                <td className="p-4 text-center">70</td>
                                <td className="p-4 text-center">25</td>
                                <td className="p-4 text-center">5</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-center">2</td>
                                <td className="p-4 text-center">22/08/2024</td>
                                <td className="p-4 text-center">200</td>
                                <td className="p-4 text-center">140</td>
                                <td className="p-4 text-center">50</td>
                                <td className="p-4 text-center">10</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <div className="flex flex-row">
                                <div>
                                    <button className="bg-black py-2 px-3 text-white rounded-lg mt-4 font-medium">Enviar Apagon</button>
                                </div>
                            </div>
                        </tfoot>
                    </Table>
                </div>
            </div>
            {/* Falta arreglar*/}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="flex flex-col mx-auto my-2">
                    <div>
                        <h2 className="text-xl font-semibold my-4 uppercase">
                            Se envió                         </h2>
                    </div>
                    <div className="mx-auto">
                        <button onClick={handleCloseModal}
                            className="mx-20 my-4 py-2 px-6 bg-teal-700 hover:bg-teal-600 rounded-lg text-white font-semibold shadow-lg"
                        >Aceptar</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Reportes;
