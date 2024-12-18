import { supabase } from "./supabase";
import { ITrails } from "../pages/trails/types";

export default async function getTrails() {
    const { data } = await supabase.from("trilha").select();

    if(data) {
        const trails: ITrails[] = data.map(item => {
            return {
                id: item.id,
                titulo: item.titulo,
                descricao: item.descricao
            }
        });

        return trails;
    }

    return [];
}