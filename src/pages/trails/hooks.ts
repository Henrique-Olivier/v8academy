import { useEffect, useState } from "react"
import { ITrails } from "./types";
import { getTrails } from "@/service/requisitions";
import isAdmin from "@/utils/verifyAcess";

export default function useTrails() {
    
    const adminLogged = isAdmin();

    const [listTrails, setListTrails] = useState<ITrails[]>([]);
    
    useEffect(() => {
        (async function () {
            const res = await getTrails();
            setListTrails(res);
            console.log(res);
        })()
    }, []);

    
    return {
        adminLogged,
        listTrails
    }
}