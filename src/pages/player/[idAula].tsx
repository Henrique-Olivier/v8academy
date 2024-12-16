import { supabase } from '@/service/supabase';
import { get } from 'http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Aula {
    id: number;
    titulo: string;
    url: string;
    fkModulo: number;   
}



export default function AulaPage() {
    const router = useRouter();
    const { idAula } = router.query;
    const [aula, setAula] = useState<Aula>();

    useEffect(() => {
        getAula();
    }, []);


    async function getAula() {
        const {data, error} = await supabase
        .from('aula')
        .select("*")
        .eq('idAula', idAula)

        if (error) {
            console.log(error)
            return
        }

        if (data) {
            setAula(data[0])
        }
        console.log(data)
    }



    return (
        <div>
            <h1>Detalhes da Aula</h1>
            <p>{aula && aula.titulo}</p>
            <iframe
                width="560"
                height="315"
                src={aula && aula.url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}