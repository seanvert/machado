export const filterUserForClient = ({ id, name, email, emailVerified, image } :{
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
}) => {
    return {
        id: id,
        name: name,
        image: image
    }
}