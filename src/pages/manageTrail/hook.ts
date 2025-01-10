import { useRouter } from "next/router";

export default function useManageTrail() {
    const router = useRouter();
    const { addOrEdit } = router.query;
}