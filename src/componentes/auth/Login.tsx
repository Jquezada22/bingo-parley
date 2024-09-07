import React from "react";

const Login: React.FC = () => {
    return (
        <div className="py-10">
            <div className="mt-8 mx-auto max-w-md">
                <div className="bg-white py-4 px-4 shadow-md rounded-lg">
                    <form className="space-y-4">
                        <div>
                            <h1 className="block text-center text-gray-500 font-bold text-3xl uppercase">Login</h1>
                        </div>
                        <div>
                            <label htmlFor="usuario" className="block md:text-1xl lg:text-1xl uppercase text-gray-500 mb-3 font-bold">Usuario</label>
                            <input className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                placeholder="Ingrese su usuario"
                                name="usuario"
                                id="usuario"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block md:text-1xl lg:text-1xl uppercase text-gray-500 mb-3 font-bold">Contraseña</label>
                            <input className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="password"
                                placeholder="Ingrese su contraseña"
                                name="password"
                                id="password"
                            />
                        </div>
                        <div className="flex gap-4 justify-around">
                            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 cursor-pointer rounded-md mt-4">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;