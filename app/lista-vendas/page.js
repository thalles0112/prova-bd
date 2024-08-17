'use client'
import Link from 'next/link'
import './style.css'
import { useEffect, useState } from "react"

export default function ListaVenda(){
    const [vendas, setVendas] = useState([])
    async function get(){
        return await fetch('http://10.0.0.160:8000/api/vendas', {
            method: 'GET',
            headers:{
              'Accept':'Application/JSON',
              'Content-Type':'Application/JSON'
          }}).then(resp=>resp.json())
        }
    

    useEffect(()=>{
        const resp = get()
        resp.then(r=>{
            if(r.length > 0){
                setVendas(r)
            }
        })
        
    },[])
    return(
        <main className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Ver vendas</h1>
            <ul className="border border-slate-400 p-4 rounded lista-vendas">
            {
                vendas.length > 0 && vendas.map(venda=>{
                    return(
                        <li className="border p-4 rounded-md bg-white flex justify-between w-72 mt-2">
                            <div>
                                {venda.cliente} - R$ {venda.valor}
                            </div>

                            <div>{new Date(venda.data).toLocaleDateString()}</div>
                        </li>
                    )
                })
            }

             
                
            </ul>

            <Link href={'/'}>{"<-"} Voltar</Link>
        </main>
    )
}