import axios from "axios";

type userDataProps = {
    site: string
    id: string
}

export const getUserData = async ({ site, id }: userDataProps): Promise<any> => {
    const url = (() => {
        switch (site) {
            case "misskey": return "https://misskey.io/@";
            default : throw Error("You don't have site name");
        }
    })();
    const response = await axios.get(url + id, { headers: { Accept: 'application/activity+json'} });
    return response
};