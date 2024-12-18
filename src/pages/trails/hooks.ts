import { useEffect, useState } from "react"
import { ITrails } from "./types";
import getTrails from "@/service/requisitions";

export default function useTrails() {
    const [listTrails, setListTrails] = useState<ITrails[]>([]);
    
    useEffect(() => {
        (async function () {
            const res = await getTrails();
            setListTrails(res);
            console.log(res);
        })()
    }, []);
    
    return {
        listTrails
    }
}