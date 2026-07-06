import { Section } from "../components/section"
import {backendUrl} from "../utils/config"

export function Favorites(){
    return <Section URL={`${backendUrl}/api/getfavorites`} page="favorites"></Section>
}

 