export const runtime = 'edge';

import axios from "axios";

type userDataProps = {
    url: string
}

export const getUserData = async ({ url }: userDataProps): Promise<any> => {
    const response = await axios.get(url, { headers: { Accept: 'application/activity+json'} })
    console.log(response)
    return response
};

type outboxProps = {
    url: string
}

export const getOutbox = async ({ url }: outboxProps): Promise<any> => {
    const resList = await axios.get(url, { headers: { Accept: 'application/activity+json'} })
    let contentUrl = resList.data.first;
    let items:any = []
    getItems: while (true) {
        const resItems = await axios.get(contentUrl, { headers: { Accept: 'application/activity+json'} })
        console.log(resItems.data.orderedItems)
        for (const item of resItems.data.orderedItems) {
            if(item.type != "Create") continue;
            if (
                !(new Date("2023-12-23T15:00:00Z") < new Date(item.published))
            ) break getItems;
            if (new Date(item.published) < new Date("2023-12-25T14:59:59Z")) items.push(item.object);
        }
        if ('next' in resItems.data) contentUrl = resItems.data.next;
        else break getItems;
    }
    console.log(items)
    return items
};