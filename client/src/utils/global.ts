export let navigate = (...args: any) => {};

export const setNavigate = (fn: any) => {
    navigate = fn;
}