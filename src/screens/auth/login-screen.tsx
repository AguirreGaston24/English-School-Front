import { createSchemaFieldRule } from "antd-zod";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { z } from "zod";

import { cn } from "../../libs/utils"
import { useAuthContext } from "../../context/auth";

const formSchema = z.object({
  email: z.string({ required_error: 'El correo es requerido' }).email({ message: "Inserte un correo valido." }),
  password: z.string({ required_error: 'La contraseña es requerida' }),
});

const rule = createSchemaFieldRule(formSchema);
type UserFormValue = z.infer<typeof formSchema>;

export const LoginScreen = () => {
  const { handleLogin, loginErrors, loading } = useAuthContext()
  const onSubmit = async (data: UserFormValue) => {
    console.log(data)
    handleLogin(data)
  };

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <a
        href="/examples/authentication"
        className={cn(
          "absolute right-4 hidden top-4 md:right-8 md:top-8",
        )}
      >
        Login
      </a>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-login_image bg-no-repeat bg-cover bg-center bg-login-pattern" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img className="mr-2 h-10" src="/assets/placeholder.jpg" alt="Logo del Instituto" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Carreras de Nivel Superior de Artes Visuales e Idiomas y Cursos de Extensión.
            </p>
            <footer className="text-sm">{new Date().getFullYear()}</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Iniciar Sesión
            </h1>
          </div>
          {loginErrors && loginErrors.map((r: any) => (
            <p className="text-red-500 text-center">{r}</p>
          ))}
          <Form
            layout="vertical"
            requiredMark={false}
            onFinish={onSubmit}
          >
            <Form.Item
              rules={[rule]}
              label="Correo electrónico"
              name="email"
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              rules={[rule]}
              label="Contraseña"
              name="password"
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading}
                htmlType="submit"
                size="large"
                className="w-full mt-2"
              >
                Iniciar sesión
              </Button>
            </Form.Item>
            <div className="items-center justify-center flex-col text-center">
              <p className="mb-3">¿No tienes una cuenta?</p>
              <Link to="/register">Registrarse</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
