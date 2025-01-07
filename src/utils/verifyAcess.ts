export default function isAdmin() {
    const listEmailAdmin = ["henrique.rosa@v8.tech", "matheus.castro@v8.tech"];

    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {

        const jsonAuthToken = JSON.parse(localStorage.getItem("sb-bfogzwmikqkepnhxrjyt-auth-token")!);

        const userEmailLogged = jsonAuthToken.user.email;

        return listEmailAdmin.includes(userEmailLogged);
    }
}