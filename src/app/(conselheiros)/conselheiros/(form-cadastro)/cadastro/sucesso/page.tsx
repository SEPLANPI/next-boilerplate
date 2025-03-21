import { Anchor } from "@mantine/core";
import { Check } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata : Metadata = {
  title: "Cadastro concluído",
}

export default function Successo() {
  return <div className="w-full min-h-[100dvh] flex items-center justify-center flex-col space-y-4 p-5 text-center">
    <span className="block bg-green-100 rounded-full p-3">
      <span className="block bg-green-600 rounded-full p-3">
        <Check className="size-6 text-white"/>
      </span>
    </span>
    <h1 className="font-montserrat text-2xl font-bold">Cadastro concluído com sucesso!</h1>
    <p className="text-gray-600 text-center max-w-md">Agradecemos sua participação. Sua inscrição foi realizada com sucesso.</p>
    <Anchor component={Link} href='/conselheiros/dados' variant=''>Ir para meu painel de conselheiro</Anchor>
  </div>
}
