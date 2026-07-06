import {Section } from "../components/section";
import {backendUrl} from "../utils/config"

export function WishList(){
    return <Section URL={`${backendUrl}/api/getwishlist`} page="wishlist"></Section>
}