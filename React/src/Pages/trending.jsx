import { Section } from "../components/section";
import {backendUrl} from "../utils/config"

export function Trending(){
    return <Section URL={`${backendUrl}/api/trendingmovies`} page="trending"></Section>
}

