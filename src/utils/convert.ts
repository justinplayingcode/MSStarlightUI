export const getAge = (dateOfBirth: Date) => {
    const year = dateOfBirth.getFullYear();
    const current = new Date().getFullYear();
    return current - year;
}