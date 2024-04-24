import { Spin } from "antd"

export const LoadingScreen = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-center py-12 max-w-2xl">
      <h3 className="text-3xl mb-3">Cargando...</h3>

      <p>
        Estamos verificando la información. Por favor, espera un momento.
      </p>

      <div className="mx-auto h-200 my-5 sm:my-10">
        <Spin size="large" />
      </div>

    </div>
  )
}
