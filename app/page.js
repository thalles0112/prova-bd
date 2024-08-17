'use client'
import Link from "next/link";
import { useRef, useState } from "react";


export default function Home() {

   const formRef = useRef(null)
   
   async function post(content){
    return await fetch('http://10.0.0.160:8000/api/vendas/', {
      method: 'POST',
      headers:{
        'Accept':'Application/JSON',
        'Content-Type':'Application/JSON'
    },
      body: JSON.stringify(content)
     }).then(resp=>resp.json())
  }

  function criarVenda(e){
    e.preventDefault()
    const form = new FormData(formRef.current)
    const values = Object.fromEntries(form.entries())
    console.log(values)
    post(values)
    
  }


  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Lançar vendas</h1>
      <form ref={formRef} onSubmit={(e)=>{criarVenda(e)}} className="flex flex-col border rounded-md p-8 bg-white">
        <div className="flex flex-col">
          <label htmlFor="bandejas">Bandejas</label>
          <input min={1} placeholder="quantidade de bandejas" className="text-black border p-2" name="bandejas" type="number"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="valor">Valor</label>
          <input className="text-black border p-2" name="valor" type="number"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="cliente">Cliente</label>
          <input placeholder="Nome do cliente" className="text-black border p-2" name="cliente" type="text"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="whatsapp">Whatsapp (somente números)</label>
          <input placeholder="Número de whatsapp" className="text-black border p-2" name="whatsapp" type="text"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="data">Data</label>
          <input className="text-black border p-2" name="data" type="date"/>
        </div>

        <button className="border p-4 rounded bg-blue-500 mt-8 text-white">Salvar</button>
      </form>

      <Link href={'/lista-vendas'}>Ver vendas {"->"}</Link>
    </main>
  );
}
